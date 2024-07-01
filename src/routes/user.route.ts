import { Router } from "express";
import { deleteUser, getUsers, updateUser } from "../controllers/user.controller";

export const UserRouter: Router = Router();

UserRouter.get("/", getUsers);
UserRouter.get("/:id", getUsers);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);
