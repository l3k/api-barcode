import { Request, Response } from "express";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { product_id } = request.params;

    const deleteProduct = new DeleteProductUseCase();

    await deleteProduct.execute({
      product_id,
    });

    return response.json({
      message: "Produto excluído com sucesso"
    });
  }
}

export { DeleteProductController };
