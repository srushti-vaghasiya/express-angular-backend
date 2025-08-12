import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

export const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (error: any) {
      res.status(400).json({ errors: error.errors });
    }
  };
