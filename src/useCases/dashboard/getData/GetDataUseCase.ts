import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";
import { isBefore, isEqual } from 'date-fns'

interface IDataRequest {
  date_start: string;
  date_end: string;
}

class GetDataUseCase {
  async execute({ date_start, date_end }: IDataRequest) {
    try {
      const dateStart: Date = new Date(date_start)
      const dateEnd: Date = new Date(date_end)

      const { associateId: associates } = await client.order.count({
        select: {
          associateId: true
        },
        where: {
          createdAt: {
            gte: dateStart,
            lte: dateEnd
          }
        },
      })

      const { _sum: { qtd: products } } = await client.order.aggregate({
        _sum: {
          qtd: true
        },
        where: {
          createdAt: {
            gte: dateStart,
            lte: dateEnd
          }
        },
      })

      const { _sum: { amount } } = await client.order.aggregate({
        _sum: {
          amount: true
        },
        where: {
          createdAt: {
            gte: dateStart,
            lte: dateEnd
          }
        },
      })

      const p = await client.order.groupBy({
        by: 'productId',
        _count: {
          _all: true
        },
        where: {
          createdAt: {
            gte: dateStart,
            lte: dateEnd
          }
        },
      })

      const MostConsumedProducts = await Promise.all(p.map(async a => {
        const product = await client.product.findFirst({
          where: {
            id: a.productId
          }
        })

        return {
          qtd: a._count._all,
          id: a.productId,
          name: product?.name
        }
      }));

      const amountPeriod = [];

      let currentDate = dateStart;

      while (isBefore(currentDate, dateEnd) || isEqual(currentDate, dateEnd)) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);

        const soma = await client.order.aggregate({
          _sum: {
            amount: true
          },
          where: {
            createdAt: {
              gte: currentDate,
              lt: nextDate
            }
          }
        });

        amountPeriod.push({
          date: currentDate.toISOString().split('T')[0],
          amount: soma._sum.amount || 0
        });

        currentDate = nextDate;
      }



      return {
        qtdAssociates: associates,
        qtdProducts: products,
        qtdAmount: amount,
        mostConsumedProducts: MostConsumedProducts,
        amountPeriod,
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

export { GetDataUseCase };
