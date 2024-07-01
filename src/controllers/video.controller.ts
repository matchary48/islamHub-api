import { Request, Response } from "express";
import {
  getAllVideo,
  getVideoAndDelete,
  getVideoById,
  getVideoByTitle,
  getVideoByUserId,
  insertVideo,
} from "../services/video.service";
import { v4 as uuidv4 } from "uuid";
import { getNameForVideo, getImageForVideo } from "../services/user.service";

export const getVideo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const q = req.query.query as string;

  if (id) {
    const video = await getVideoById(id);
    if (video) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data video successfully",
        data: video,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } else if (q) {
    const video = await getVideoByTitle(q);
    if (video) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get search data video successfully",
        data: video,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } else {
    return await getAllVideo(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const getVideoByUser = async (req: Request, res: Response) => {
  const { user_video_id, user_id } = req.params;

  try {
    const video = await getVideoByUserId(user_video_id, user_id);
    if (Array.isArray(video) && video.length > 0) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get data video by user id success",
        data: video,
      });
    } else {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "No video posted",
        data: {},
      });
    }
  } catch (error) {
    return await getAllVideo(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const createVideo = async (req: Request, res: Response) => {
  const video_id = uuidv4();
  const { user_video_id, title, description, video } = req.body;

  if (!title || !description || !user_video_id) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "All fields are required",
    });
  }

  const name = await getNameForVideo(user_video_id);
  const imgUser = await getImageForVideo(user_video_id);

  const videoData = {
    video_id,
    user_video_id,
    title,
    description,
    video,
    name: name,
    user_image: imgUser,
  };

  try {
    await insertVideo(videoData);
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "video created successfully",
      data: videoData,
    });
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message || "An error occurred",
      data: {},
    });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await getVideoAndDelete(id);
    if (result) {
      res.status(200).json({
        status: true,
        status_code: 200,
        message: "Delete video successfully",
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
