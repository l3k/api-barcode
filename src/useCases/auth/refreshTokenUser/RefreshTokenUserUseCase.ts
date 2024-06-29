import dayjs from "dayjs";
import { CustomError } from "../../../interfaces/CustomError";
import { client } from "../../../prisma/client";
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      const error: CustomError = new Error("Sessão expirada");
      error.code = 400;
      throw error;
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      const error: CustomError = new Error("Sessão expirada");
      error.code = 400;
      throw error;
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    const generateRefreshToken = new GenerateRefreshToken();
    const newRefreshToken = await generateRefreshToken.execute(
      refreshToken.userId
    );

    return { access_token: token, refresh_token: newRefreshToken };
  }
}

export { RefreshTokenUserUseCase };
