import { Request, Response } from "express";
import { UpdateOrderUseCase } from "./UpdateOrderUseCase";

class UpdateOrderController {
  async handle(request: Request, response: Response) {
    const { order_id, qtd, obs, associate_id, product_id } = request.body;

    const createOrderCase = new UpdateOrderUseCase();

    await createOrderCase.execute({
      order_id, qtd, obs, associate_id, product_id
    });

    return response.json({
      message: "Registro atualizado com sucesso"
    });
  }
}

export { UpdateOrderController };
