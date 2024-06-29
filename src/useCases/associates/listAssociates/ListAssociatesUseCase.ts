import { Associate } from "@prisma/client";
import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IAssociateRequest {
  name: string;
}

class ListAssociatesUseCase {
  async execute({ name }: IAssociateRequest) {
    try {
      const associates = await client.$queryRaw<Associate[]>`
        SELECT * FROM associates
        WHERE LOWER(name) LIKE LOWER(${`%${name}%`})
        ORDER BY name ASC
      ;`;

      return associates;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao listar produtos"
      );
      error.code = 400;
      throw error;
    }
  }
}

export { ListAssociatesUseCase };
