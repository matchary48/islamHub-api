import { Router } from "express";
import {
  createCommunity,
  deleteCommunity,
  getCommunities,
  updateCommunity,
} from "../controllers/community.controller";

export const CommunityRouter: Router = Router();

CommunityRouter.get("/", getCommunities);
CommunityRouter.get("/search", getCommunities);
CommunityRouter.get("/:id", getCommunities);
CommunityRouter.post("/", createCommunity);
CommunityRouter.put("/:id", updateCommunity);
CommunityRouter.delete("/:id", deleteCommunity);
