import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { CustomError } from "./interfaces/CustomError";

const port = 3001;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(router);

app.use(
  (
    error: CustomError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    return response.status(error.code || 400).json({
      message: error.message,
    });
  }
);

app.listen(port, () => console.log(`🔥 Server is running on port ${port}`));