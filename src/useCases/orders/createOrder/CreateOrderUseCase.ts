import { client } from "../../../prisma/client";
import { CustomError } from "../../../interfaces/CustomError";

interface IOrderRequest {
  qtd: number;
  obs: string;
  associate_id: string;
  product_id: string;
}

class CreateOrderUseCase {
  async execute({ qtd, obs, associate_id, product_id }: IOrderRequest) {
    try {
      const product = await client.product.findFirst({
        where: {
          id: product_id
        }
      })

      if (!product) {
        const error: CustomError = new Error(
          "Não foi possível encontrar o produto"
        );
        error.code = 404;
        throw error;
      }

      const associate = await client.associate.findFirst({
        where: {
          id: associate_id
        }
      })

      if (!associate) {
        const error: CustomError = new Error(
          "Não foi possível encontrar o associado"
        );
        error.code = 404;
        throw error;
      }

      const amount = Number(product.value) * qtd

      const order = await client.order.create({
        data: {
          qtd,
          amount,
          obs: obs || "",
          productId: product_id,
          associateId: associate_id
        },
      });

      return order;
    } catch (e) {
      const error: CustomError = new Error(
        "Erro ao registrar consumo"
      );
      error.code = 404;
      throw error;
    }
  }
}

export { CreateOrderUseCase };
