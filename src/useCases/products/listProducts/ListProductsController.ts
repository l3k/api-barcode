import { Request, Response } from "express";
import { ListProductsUseCase } from "./ListProductsUseCase";

interface Query {
  name: string;
}

class ListProductsController {
  async handle(request: Request, response: Response) {
    const { name } = request.query as unknown as Query;

    const listProductsCase = new ListProductsUseCase();

    const products = await listProductsCase.execute({
      name: name || "",
    });

    return response.json(products);
  }
}

export { ListProductsController };
