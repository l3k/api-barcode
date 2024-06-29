import { hash } from "bcryptjs";
import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "APP";
}

class CreateUserUseCase {
  async execute({ name, email, password, role }: IUserRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      const error: CustomError = new Error("O e-mail utilizado já existe");
      error.code = 409;
      throw error;
    }

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
