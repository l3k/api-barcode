import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IProductRequest {
  name: string;
  description: string;
  value: string;
  code: string;
}

class CreateProductUseCase {
  async execute({ name, description, value, code }: IProductRequest) {
    try {
      const product = await client.product.create({
        data: {
          name,
          description: description || '',
          value: value,
          code
        },
      });

      return product;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao criar produto"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { CreateProductUseCase };
