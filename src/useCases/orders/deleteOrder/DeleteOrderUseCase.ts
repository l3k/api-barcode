import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IOrderRequest {
  order_id: string;
}

class DeleteOrderUseCase {
  async execute({ order_id }: IOrderRequest) {
    try {
      await client.order.delete({
        where: {
          id: order_id,
        },
      });

      return true;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao excluir consumo"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { DeleteOrderUseCase };
