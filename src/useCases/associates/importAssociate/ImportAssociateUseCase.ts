import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";
import csvParser from 'csv-parser';
import fs from 'fs';

export interface IDataRequest {
  filePath: string
}

interface Item {
  name: string
  document: string
  email: string
  phone: string
}

class ImportAssociateUseCase {
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
              const existAssociate = await client.associate.findFirst({
                where: {
                  email: item.email
                }
              })
              if (!existAssociate) {
                await client.associate.create({
                  data: {
                    name: item.name,
                    document: item.document,
                    email: item.email,
                    phone: item.phone,
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

export { ImportAssociateUseCase };
