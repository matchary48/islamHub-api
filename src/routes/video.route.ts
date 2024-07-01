import { Router } from "express";

import { requireUser } from "../middleware/auth";
import {
  createVideo,
  deleteVideo,
  getVideo,
  getVideoByUser,
} from "../controllers/video.controller";

export const VideoRouter: Router = Router();

VideoRouter.get("/", getVideo);
VideoRouter.get("/search", getVideo);
VideoRouter.get("/:id", getVideo);
VideoRouter.get("/:user_id/:user_video_id", getVideoByUser);
VideoRouter.post("/", createVideo);
VideoRouter.put("/:id");
VideoRouter.delete("/:id", deleteVideo);
