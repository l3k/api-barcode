import { Request, Response } from "express";
import { UpdateAssociateUseCase } from "./UpdateAssociateUseCase";

class UpdateAssociateController {
  async handle(request: Request, response: Response) {
    const { associate_id, name, document, phone, email } = request.body;

    const updateAssociateCase = new UpdateAssociateUseCase();

    const associate = await updateAssociateCase.execute({
      associate_id, name, document, phone, email
    });

    return response.json(associate);
  }
}

export { UpdateAssociateController };
