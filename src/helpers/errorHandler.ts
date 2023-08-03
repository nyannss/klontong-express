import { Response } from 'express';

import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export function errorResponse(err: any, res: Response) {
  console.log(err);
  if (err instanceof PrismaClientValidationError) {
    const lines = err.message.split("\n");
    const errorMessage = lines[lines.length - 1].trim();

    return res.status(500).json({
      msg: "Prisma Error: " + errorMessage,
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    let errorMessage = err.meta ? err.meta.cause : err.message;

    return res.status(500).json({
      msg: "Prisma Error: " + errorMessage,
    });
  }

  const errorMessage =
    err instanceof Error ? err.message : "Internal Server Error";
  res.status(500).json({
    msg: errorMessage,
  });
}
