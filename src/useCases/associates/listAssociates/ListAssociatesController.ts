import { Request, Response } from "express";
import { ListAssociatesUseCase } from "./ListAssociatesUseCase";

interface Query {
  name: string;
}

class ListAssociatesController {
  async handle(request: Request, response: Response) {
    const { name } = request.query as unknown as Query;

    const listAssociatesCase = new ListAssociatesUseCase();

    const associates = await listAssociatesCase.execute({
      name: name || "",
    });

    return response.json(associates);
  }
}

export { ListAssociatesController };
