import { Router } from "express";
import { requireUser } from "../middleware/auth";
import {
  createKajian,
  deleteKajian,
  getKajian,
  getKajianByUser,
  updateKajian,
} from "../controllers/kajian.controller";

export const KajianRouter: Router = Router();

KajianRouter.get("/", getKajian);
KajianRouter.get("/search", getKajian);
KajianRouter.get("/:id", getKajian);
KajianRouter.get("/:user_id/:user_kajian_id", getKajianByUser);
KajianRouter.post("/", createKajian);
KajianRouter.put("/:id", updateKajian);
KajianRouter.delete("/:id", deleteKajian);
