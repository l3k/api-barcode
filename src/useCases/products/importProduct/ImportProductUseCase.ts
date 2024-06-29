import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";
import csvParser from 'csv-parser';
import fs from 'fs';

export interface IDataRequest {
  filePath: string
}

interface Item {
  code: string
  name: string
  value: string
}

class ImportProductUseCase {
  async execute({ filePath }: IDataRequest) {
    try {
      const fileRows: Item[] = [];

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (line: Item) => {
          fileRows.push(line)
        })
        .on('end', async () => {
          await Promise.all(
            fileRows.map(async item => {
              const existProduct = await client.product.findFirst({
                where: {
                  name: item.name
                }
              })
              if (!existProduct) {
                await client.product.create({
                  data: {
                    code: item.code,
                    name: item.name,
                    value: item.value,
                  },
                });
              }
            })
          )

          await fs.promises.unlink(filePath);

        });

      return { message: "Arquivo importado com sucesso" }
    } catch (e) {
      console.log(e)
      const error: CustomError = new Error(
        "Erro ao obter dados"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { ImportProductUseCase };
