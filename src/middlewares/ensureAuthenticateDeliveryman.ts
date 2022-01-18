import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "token missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "910159a253f77b53f94f4a4ec3517d69"
    ) as IPayload;

    request.id_deliveryman = sub;

    console.log(sub);
    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid Token",
    });
  }
}
