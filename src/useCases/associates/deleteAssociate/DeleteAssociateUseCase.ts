import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IAssociateRequest {
  associate_id: string;
}

class DeleteAssociateUseCase {
  async execute({ associate_id }: IAssociateRequest) {
    try {
      await client.associate.delete({
        where: {
          id: associate_id,
        },
      });

      return true;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao excluir associado"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { DeleteAssociateUseCase };
