import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getAllKajian,
  getKajianAndDelete,
  getKajianAndUpdate,
  getKajianById,
  getKajianByTitle,
  getKajianByUserId,
  getKajianImage,
  insertKajian,
} from "../services/kajian.service";

export const getKajian = async (req: Request, res: Response) => {
  const id = req.params.id;
  const q = req.query.query as string;

  if (id) {
    const kajian = await getKajianById(id);
    if (kajian) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data kajian successfully",
        data: kajian,
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
    const kajian = await getKajianByTitle(q);
    if (kajian) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data kajian successfully",
        data: kajian,
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
    return await getAllKajian(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const getKajianByUser = async (req: Request, res: Response) => {
  const { user_kajian_id, user_id } = req.params;

  try {
    await getKajianByUserId(user_kajian_id, user_id, req, res);
  } catch (error) {
    return await getAllKajian(req, res, (error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
  }
};

export const getSearchKajian = async (req: Request, res: Response) => {
  const q = req.params.q;

  const kajian = await getKajianByTitle(q);
  if (kajian) {
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Get data kajian ",
      data: kajian,
    });
  } else {
    return res.status(404).send({
      status: false,
      status_code: 404,
      message: "Data not found",
      data: {},
    });
  }
};

export const createKajian = async (req: Request, res: Response) => {
  const kajian_id = uuidv4();
  const { title, description, user_kajian_id, image, date, lokasi, time } =
    req.body;

  if (
    !title ||
    !description ||
    !image ||
    !user_kajian_id ||
    !date ||
    !lokasi ||
    !time
  ) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "All fields are required",
    });
  }

  const kajianData = {
    kajian_id,
    user_kajian_id,
    title,
    description,
    image,
    date,
    lokasi,
    time,
  };

  try {
    await insertKajian(kajianData);
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "kajian created successfully",
      data: kajianData,
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

export const updateKajian = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, user_kajian_id, image, date, lokasi, time } =
    req.body;

  let imagePrevious;

  if (image) {
    imagePrevious = image;
  } else {
    imagePrevious = await getKajianImage(id);
  }

  if (!title || !description || !date || !user_kajian_id || !lokasi || !time) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "All fields are required",
    });
  }

  const kajianData = {
    user_kajian_id,
    title,
    description,
    image: imagePrevious,
    date,
    lokasi,
    time,
  };

  try {
    const kajian = await getKajianAndUpdate(id, kajianData);
    if (kajian) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "kajian updated successfully",
        data: kajianData,
      });
    } else {
      return res.status(404).json({
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
      message: error.message || "An error occurred",
      data: {},
    });
  }
};

export const deleteKajian = async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    const result = await getKajianAndDelete(postId);
    if (result) {
      res.status(200).json({
        status: true,
        status_code: 200,
        message: "Delete kajian successfully",
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
