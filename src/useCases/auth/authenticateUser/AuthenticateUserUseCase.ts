import { compare, hash } from "bcryptjs";
import { CustomError } from "../../../interfaces/CustomError";
import { client } from "../../../prisma/client";
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      const error: CustomError = new Error("E-mail e/ou senha inválidos");
      error.code = 400;
      throw error;
    }

    const passMatch = await compare(password, userAlreadyExists.password);

    if (!passMatch) {
      const error: CustomError = new Error("E-mail e/ou senha inválidos");
      error.code = 400;
      throw error;
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return {
      access_token: token,
      refresh_token: refreshToken,
      user: {
        id: userAlreadyExists.id,
        name: userAlreadyExists.name,
        email: userAlreadyExists.email,
        role: userAlreadyExists.role,
      },
    };
  }
}

export { AuthenticateUserUseCase };
