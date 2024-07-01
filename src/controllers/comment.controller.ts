import { Request, Response } from "express";
import {
  getAllComment,
  getCommentAndDelete,
  getCommentByVideoId,
  insertComment,
} from "../services/comment.service";
import { v4 as uuidv4 } from "uuid";

export const getComments = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (id) {
    const comment = await getCommentByVideoId(id);
    if (comment) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data comment successfully",
        data: comment,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "No comment posted",
        data: {},
      });
    }
  } else {
    try {
      const comments = await getAllComment();
      if (Array.isArray(comments) && comments.length > 0) {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "Get data comment success",
          data: comments,
        });
      } else {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "No comment posted",
          data: {},
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        status_code: 500,
        message: "Internal Server Error",
        data: {},
      });
    }
  }
};

export const createComment = async (req: Request, res: Response) => {
  const comment_id = uuidv4();
  const { user_id, video_id, comment, name } = req.body;

  if (!comment) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Comment field are required",
    });
  }

  const commentData = {
    comment_id,
    user_id,
    video_id,
    name,
    comment,
  };

  try {
    await insertComment(commentData);
    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "created comment successfully",
      data: commentData,
    });
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message,
    });
  }
};

export const getCommentByVideo = async (req: Request, res: Response) => {
  const video_id = req.params.video_id;

  const comment = await getCommentByVideoId(video_id);
  if (comment) {
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Get detail data comment successfully",
      data: comment,
    });
  } else {
    return res.status(404).send({
      status: false,
      status_code: 404,
      message: "No comment posted",
      data: {},
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await getCommentAndDelete(id);
    if (result) {
      res.status(200).json({
        status: true,
        status_code: 200,
        message: "Delete comment successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message,
    });
  }
};
