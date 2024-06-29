import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IAssociateRequest {
  associate_id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
}

class UpdateAssociateUseCase {
  async execute({ associate_id, name, document, phone, email }: IAssociateRequest) {
    try {
      const associate = await client.associate.update({
        where: {
          id: associate_id,
        },
        data: {
          name,
          document,
          phone: phone || "",
          email,
        },
      });

      return associate;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao atualizar associado"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { UpdateAssociateUseCase };
