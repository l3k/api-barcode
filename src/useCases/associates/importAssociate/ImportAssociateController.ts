import { Request, Response } from "express";
import { IDataRequest, ImportAssociateUseCase } from "./ImportAssociateUseCase";

class ImportAssociateController {
  async handle(request: Request, response: Response) {
    const importCase = new ImportAssociateUseCase();

    const filePath = request.file?.path;

    if (!filePath) {
      return response.status(400).json({ error: 'File not provided' });
    }

    const requestData: IDataRequest = {
      filePath: filePath
    };

    const data = await importCase.execute(requestData);

    return response.json(data);
  }
}

export { ImportAssociateController };
