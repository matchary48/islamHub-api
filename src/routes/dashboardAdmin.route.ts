import { Router } from "express";
import { getTotalData } from "../controllers/dashboardAdmin.controller";

export const DashboardAdminRouter: Router = Router();

DashboardAdminRouter.get("/count-data", getTotalData);
