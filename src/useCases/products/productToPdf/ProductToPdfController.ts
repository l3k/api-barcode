import { Request, Response } from "express";
import { ProductToPdfUseCase } from "./ProductToPdfUseCase";

class ProductToPdfController {
  async handle(request: Request, response: Response) {
    const pdfCase = new ProductToPdfUseCase();

    const data = await pdfCase.execute();

    if (data.success) {
      return response.download(data.filename);
    }
  }
}

export { ProductToPdfController };
