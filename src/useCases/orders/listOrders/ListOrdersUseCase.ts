import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

class ListOrdersUseCase {
  async execute() {
    try {
      const orders = await client.order.findMany({
        include: {
          associate: true,
          product: true
        },
        orderBy: {
          createdAt: "desc"
        }
      });

      return orders;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao listar consumos"
      );
      error.code = 400;
      throw error;
    }
  }
}

export { ListOrdersUseCase };
