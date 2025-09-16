import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token" });

  const token = header.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  (req as any).userId = decoded.userId;
  next();
};
