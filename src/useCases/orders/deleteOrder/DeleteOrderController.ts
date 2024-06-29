import { Request, Response } from "express";
import { DeleteOrderUseCase } from "./DeleteOrderUseCase";

class DeleteOrderController {
  async handle(request: Request, response: Response) {
    const { order_id } = request.params;

    const deleteOrder = new DeleteOrderUseCase();

    await deleteOrder.execute({
      order_id,
    });

    return response.json({
      message: "Produto excluído com sucesso"
    });
  }
}

export { DeleteOrderController };
