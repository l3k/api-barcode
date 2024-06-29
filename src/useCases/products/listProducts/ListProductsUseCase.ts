import { Product } from "@prisma/client";
import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IProductRequest {
  name: string;
}

class ListProductsUseCase {
  async execute({ name }: IProductRequest) {
    try {
      const products = await client.$queryRaw<Product[]>`
        SELECT * FROM products
        WHERE LOWER(name) LIKE LOWER(${`%${name}%`})
        ORDER BY name ASC
      ;`;

      return products;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao listar produtos"
      );
      error.code = 400;
      throw error;
    }
  }
}

export { ListProductsUseCase };
