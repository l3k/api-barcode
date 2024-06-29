import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, phone, role } = request.body;

    const createUserCase = new CreateUserUseCase();

    await createUserCase.execute({
      name,
      email,
      password,
      role,
    });

    return response.json({
      message: "Usuário cadastrado com sucesso"
    });
  }
}

export { CreateUserController };
