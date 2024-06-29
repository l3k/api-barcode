import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IProductRequest {
  product_id: string;
}

class ListProductUseCase {
  async execute({ product_id }: IProductRequest) {
    try {
      const product = await client.product.findFirst({
        where: {
          id: product_id
        }
      })

      if (!product) {
        const error = new Error();
        throw error;
      }

      return product;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao listar produto"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { ListProductUseCase };
