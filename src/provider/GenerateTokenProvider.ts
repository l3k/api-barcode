import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = sign({}, `${JWT_SECRET}`, {
      subject: `${userId}`,
      expiresIn: "3d",
    });

    return token;
  }
}

export { GenerateTokenProvider };
