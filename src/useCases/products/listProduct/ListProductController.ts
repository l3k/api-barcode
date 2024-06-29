import { Request, Response } from "express";
import { ListProductUseCase } from "./ListProductUseCase";

class ListProductController {
  async handle(request: Request, response: Response) {
    const { product_id } = request.params;

    const listProductCase = new ListProductUseCase();

    const product = await listProductCase.execute({
      product_id
    });

    return response.json(product);
  }
}

export { ListProductController };
