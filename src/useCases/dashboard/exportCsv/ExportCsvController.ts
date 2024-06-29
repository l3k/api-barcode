import { Request, Response } from "express";
import { ExportCsvUseCase } from "./ExportCsvUseCase";

interface Query {
  date_start: string;
  date_end: string;
}

class ExportCsvController {
  async handle(request: Request, response: Response) {
    const {
      date_start,
      date_end
    } = request.query as unknown as Query;

    const exportCase = new ExportCsvUseCase();

    const data = await exportCase.execute({
      date_start,
      date_end,
    });

    if (data.success) {
      return response.download(data.filename);
    }

  }
}

export { ExportCsvController };
