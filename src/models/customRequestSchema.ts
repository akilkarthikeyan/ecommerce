import { Request } from "express";
import { User } from "./userSchemas";

export default interface CustomRequest extends Request {
    user: User;
}
