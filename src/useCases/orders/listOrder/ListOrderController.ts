import { Request, Response } from "express";
import { ListOrderUseCase } from "./ListOrderUseCase";

class ListOrderController {
  async handle(request: Request, response: Response) {
    const { order_id } = request.params;

    const listOrderCase = new ListOrderUseCase();

    const order = await listOrderCase.execute({
      order_id
    });

    return response.json(order);
  }
}

export { ListOrderController };
