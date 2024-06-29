import { Request, Response } from "express";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { qtd, obs, associate_id, product_id } = request.body;

    const createOrderCase = new CreateOrderUseCase();

    await createOrderCase.execute({
      qtd, obs, associate_id, product_id
    });

    return response.json({
      message: "Registro efetuado com sucesso"
    });
  }
}

export { CreateOrderController };
