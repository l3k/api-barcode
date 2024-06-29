import { Request, Response } from "express";
import { ListOrdersUseCase } from "./ListOrdersUseCase";

class ListOrdersController {
  async handle(request: Request, response: Response) {
    const listOrdersCase = new ListOrdersUseCase();

    const orders = await listOrdersCase.execute();

    return response.json(orders);
  }
}

export { ListOrdersController };
