import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const signToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

export const verifyToken = (token: string): (JwtPayload & { userId: number }) | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload & { userId: number };
  } catch {
    return null;
  }
};
