import { Request, Response } from "express";
import { getCountData } from "../services/dashboardAdmin.service";

export const getTotalData = async (req: Request, res: Response) => {
  try {
    return await getCountData(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
