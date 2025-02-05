import { IUser } from "../../models/Users";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // or matching your JWT payload structure
      };
    }
  }
}
