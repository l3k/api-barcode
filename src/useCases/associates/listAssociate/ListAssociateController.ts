import { Request, Response } from "express";
import { ListAssociateUseCase } from "./ListAssociateUseCase";

class ListAssociateController {
  async handle(request: Request, response: Response) {
    const { associate_id } = request.params;

    const listAssociateCase = new ListAssociateUseCase();

    const associate = await listAssociateCase.execute({
      associate_id
    });

    return response.json(associate);
  }
}

export { ListAssociateController };
