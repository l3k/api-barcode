import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IAssociateRequest {
  name: string;
  document: string;
  phone: string;
  email: string;
}

class CreateAssociateUseCase {
  async execute({ name, document, phone, email }: IAssociateRequest) {
    try {
      const associate = await client.associate.create({
        data: {
          name,
          document,
          phone: phone || "",
          email,
        },
      });

      return associate;
    } catch (e) {
      console.log(e)
      const error: CustomError = new Error(
        "Erro ao criar associado"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { CreateAssociateUseCase };
