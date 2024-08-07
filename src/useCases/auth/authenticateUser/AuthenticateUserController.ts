import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const auth = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(auth);
  }
}

export { AuthenticateUserController };
