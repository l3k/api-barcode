import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IAssociateRequest {
  associate_id: string;
}

class ListAssociateUseCase {
  async execute({ associate_id }: IAssociateRequest) {
    try {
      const associate = await client.associate.findFirst({
        where: {
          id: associate_id
        }
      })

      if (!associate) {
        const error = new Error();
        throw error;
      }

      return associate;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao listar associado"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { ListAssociateUseCase };
