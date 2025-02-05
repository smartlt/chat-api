import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let token = "";
  if (!authHeader) {
    res.status(401).json({ message: "No token provided." });
  } else {
    token = authHeader.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default isAuthenticated;
