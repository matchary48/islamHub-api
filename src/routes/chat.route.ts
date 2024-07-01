import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChats,
  getChatByCommunity,
} from "../controllers/chat.controller"

export const ChatRouter: Router = Router();

ChatRouter.get("/", getChats);
ChatRouter.get("/:community_id", getChatByCommunity);
ChatRouter.post("/", createChat);
ChatRouter.delete("/:id", deleteChat);
