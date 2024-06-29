import dayjs from "dayjs";
import { client } from "../prisma/client";

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "days").unix();

    const refreshTokenExist = await client.refreshToken.findFirst({
      where: {
        userId,
      },
    });

    if (refreshTokenExist) {
      await client.refreshToken.delete({
        where: {
          userId,
        },
      });
    }

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
