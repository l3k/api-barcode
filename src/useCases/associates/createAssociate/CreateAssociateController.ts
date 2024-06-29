import { Request, Response } from "express";
import { CreateAssociateUseCase } from "./CreateAssociateUseCase";

class CreateAssociateController {
  async handle(request: Request, response: Response) {
    const { name, document, phone, email } = request.body;

    const createAssociateCase = new CreateAssociateUseCase();

    await createAssociateCase.execute({
      name, document, phone, email
    });

    return response.json({
      message: "Associado cadastrado com sucesso"
    });
  }
}

export { CreateAssociateController };
