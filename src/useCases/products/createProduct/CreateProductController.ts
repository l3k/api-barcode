import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, value, code } = request.body;

    const createProductCase = new CreateProductUseCase();

    await createProductCase.execute({
      name,
      description,
      value,
      code
    });

    return response.json({
      message: "Produto cadastrado com sucesso"
    });
  }
}

export { CreateProductController };
