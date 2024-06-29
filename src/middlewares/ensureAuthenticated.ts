import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { client } from "../prisma/client";

interface JwtPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Usuário não autorizado",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const decoded = verify(token, `${JWT_SECRET}`) as JwtPayload;

    const user = await client.user.findFirst({
      where: {
        id: decoded.sub,
      },
    });

    if (!user) {
      return response.status(401).json({
        message: "Usuário não autorizado",
      });
    }

    request.user = user;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Usuário não autorizado",
    });
  }
}
