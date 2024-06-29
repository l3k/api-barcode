import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IProductRequest {
  product_id: string;
  name: string;
  description: string;
  value: string;
  code: string;
}

class UpdateProductUseCase {
  async execute({ product_id, name, description, value, code }: IProductRequest) {
    try {
      const product = await client.product.update({
        where: {
          id: product_id,
        },
        data: {
          name,
          description: description || '',
          value,
          code
        },
      });

      return product;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao atualizar produto"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { UpdateProductUseCase };
