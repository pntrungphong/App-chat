import * as jwt from "jsonwebtoken";
import { get } from "config";
export const auth = (req: any, res: any, next: any) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decode = jwt.verify(token, get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
