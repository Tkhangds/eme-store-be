import { NextFunction, Request, Response } from "express";
import getRawBody from "raw-body";

export async function rawBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers["stripe-signature"]) {
    try {
      req.body = await getRawBody(req, {
        length: req.headers["content-length"],
        limit: "1mb",
        encoding: "utf-8",
      });
    } catch (err) {
      console.error("Error getting raw body for Stripe webhook:", err);
      return res.status(400).send("Invalid webhook payload");
    }
  }

  next();
}
