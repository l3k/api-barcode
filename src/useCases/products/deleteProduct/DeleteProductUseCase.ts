import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IProductRequest {
  product_id: string;
}

class DeleteProductUseCase {
  async execute({ product_id }: IProductRequest) {
    try {
      await client.product.delete({
        where: {
          id: product_id,
        },
      });

      return true;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao excluir produto"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { DeleteProductUseCase };
