import { Request, Response } from "express";
import { GetDataUseCase } from "./GetDataUseCase";

interface Query {
  date_start: string;
  date_end: string;
}

class GetDataController {
  async handle(request: Request, response: Response) {
    const {
      date_start,
      date_end
    } = request.query as unknown as Query;

    const getDataCase = new GetDataUseCase();

    const data = await getDataCase.execute({
      date_start,
      date_end,
    });

    return response.json(data);
  }
}

export { GetDataController };
