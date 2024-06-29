import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IOrderRequest {
  order_id: string;
}

class ListOrderUseCase {
  async execute({ order_id }: IOrderRequest) {
    try {
      const order = await client.order.findFirst({
        where: {
          id: order_id
        }
      })

      return order;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao listar associado"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { ListOrderUseCase };
