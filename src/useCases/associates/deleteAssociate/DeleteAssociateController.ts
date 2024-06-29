import { Request, Response } from "express";
import { DeleteAssociateUseCase } from "./DeleteAssociateUseCase";

class DeleteAssociateController {
  async handle(request: Request, response: Response) {
    const { associate_id } = request.params;

    const deleteAssociate = new DeleteAssociateUseCase();

    await deleteAssociate.execute({
      associate_id,
    });

    return response.json({
      message: "Associado excluído com sucesso"
    });
  }
}

export { DeleteAssociateController };
