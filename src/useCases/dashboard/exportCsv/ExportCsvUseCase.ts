import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";
import { format, subHours } from 'date-fns'
import { createObjectCsvWriter } from 'csv-writer'

interface IDataRequest {
  date_start: string;
  date_end: string;
}

class ExportCsvUseCase {
  async execute({ date_start, date_end }: IDataRequest) {
    try {
      const dateStart: Date = new Date(date_start)
      const dateEnd: Date = new Date(date_end)

      const orders = await client.order.findMany({
        include: {
          associate: true,
          product: true,
        },
        where: {
          createdAt: {
            gte: dateStart,
            lte: dateEnd
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      const header = [
        { id: 'produto_code', title: 'Código do Produto' },
        { id: 'produto_name', title: 'Nome do Produto' },
        { id: 'associate_name', title: 'Nome do Associado' },
        { id: 'associate_email', title: 'E-mail do Associado' },
        { id: 'associate_phone', title: 'Telefone do Associado' },
        { id: 'value', title: 'Valor' },
        { id: 'qtd', title: 'Quantidade' },
        { id: 'date', title: 'Data' },
        { id: 'obs', title: 'Observação' },
      ];

      const result = orders.map(order => {
        return {
          produto_code: order.product.code,
          produto_name: order.product.name,
          associate_name: order.associate.name,
          associate_email: order.associate.email,
          associate_phone: order.associate.phone,
          value: String(order.amount).replace('.', ','),
          qtd: order.qtd,
          date: format(subHours(order.createdAt, 3), 'dd/MM/yyyy HH:mm'),
          obs: order.obs
        }
      })

      const csvWriter = createObjectCsvWriter({
        path: 'orders.csv',
        header: header
      });

      await csvWriter.writeRecords(result)

      return {
        success: true,
        filename: 'orders.csv'
      }

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

export { ExportCsvUseCase };
