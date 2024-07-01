import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentByVideo,
  getComments,
} from "../controllers/comment.controller";

export const CommentRouter: Router = Router();

CommentRouter.get("/", getComments);
CommentRouter.get("/:video_id", getCommentByVideo);
CommentRouter.post("/", createComment);
CommentRouter.delete("/:id", deleteComment);
