import { Request, Response } from "express";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { product_id, name, description, value, code } = request.body;

    const updateProductCase = new UpdateProductUseCase();

    const product = await updateProductCase.execute({
      product_id,
      name,
      description,
      value,
      code
    });

    return response.json(product);
  }
}

export { UpdateProductController };
