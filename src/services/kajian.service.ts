import { Request, Response, NextFunction } from "express";
import kajianModel from "../models/kajian.model";
import authModel from "../models/auth.model";

export const getAllKajian = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  try {
    const count = await kajianModel.countDocuments();
    totalItems = count;

    const totalPages = Math.ceil(Number(totalItems) / Number(perPage));

    const kajian = await kajianModel
      .find()
      .sort({ createdAt: -1 })
      .skip(
        (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
      )
      .limit(parseInt(perPage.toString()));

    if (Array.isArray(kajian) && kajian.length > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data kajian successfully",
        data: kajian,
        total_data: totalItems,
        per_page: parseInt(perPage.toString()),
        current_page: parseInt(currentPage.toString()),
        total_page: totalPages,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data kajian successfully",
        data: "No kajian posted",
        total_data: totalItems,
        per_page: parseInt(perPage.toString()),
        current_page: parseInt(currentPage.toString()),
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getKajianById = async (id: string) => {
  return await kajianModel.findOne({ kajian_id: id });
};

export const getKajianByTitle = async (q: string) => {
  return await kajianModel.find({ title: { $regex: new RegExp(q, "i") } });
};

export const insertKajian = async (payload: any) => {
  return await kajianModel.create(payload);
};

export const getKajianAndUpdate = async (id: string, payload: any) => {
  return await kajianModel.findOneAndUpdate(
    {
      kajian_id: id,
    },
    {
      $set: payload,
    }
  );
};

export const getKajianByUserId = async (
  user_kajian_id: string,
  user_id: string,
  req: Request,
  res: Response
) => {
  try {
    const idUserBlog = await kajianModel.findOne({
      user_kajian_id: user_kajian_id,
    });
    const idUser = await authModel.findOne({ user_id: user_id });

    // Jika user_id dan user_kajian_id tidak sama, ambil blog berdasarkan user_kajian_id saja
    if (idUser && idUserBlog && idUserBlog.user_kajian_id === user_kajian_id) {
      const currentPage = req.query.page || 1;
      const perPage = req.query.perPage || 5;

      const count = await kajianModel.countDocuments({
        user_kajian_id: user_kajian_id,
      });
      const totalItems = count;

      const totalPages = Math.ceil(Number(totalItems) / Number(perPage));

      const kajian = await kajianModel
        .find({ user_kajian_id: user_kajian_id })
        .skip(
          (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
        )
        .limit(parseInt(perPage.toString()));

      if (kajian.length > 0) {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data kajian successfully",
          data: kajian,
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
          total_page: totalPages,
        });
      } else {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data blogs successfully",
          data: "No blogs posted",
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
        });
      }
    } else {
      // Jika user_id dan user_kajian_id tidak sama, tambahkan fitur API untuk mengambil berdasarkan user_kajian_id saja
      const currentPage = req.query.page || 1;
      const perPage = req.query.perPage || 5;

      const count = await kajianModel.countDocuments({
        user_kajian_id: user_kajian_id,
      });
      const totalItems = count;

      const blogs = await kajianModel
        .find({ user_kajian_id: user_kajian_id })
        .skip(
          (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
        )
        .limit(parseInt(perPage.toString()));

      if (blogs.length > 0) {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data blogs successfully",
          data: blogs,
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
        });
      } else {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Get data blogs successfully",
          data: "No blogs posted",
          total_data: totalItems,
          per_page: parseInt(perPage.toString()),
          current_page: parseInt(currentPage.toString()),
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getKajianAndDelete = async (id: string) => {
  try {
    const kajian = await kajianModel.findOne({ kajian_id: id });
    if (!kajian) {
      const error = new Error("Data not found");
      throw error;
    }

    const result = await kajianModel.findOneAndDelete({ kajian_id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getKajianImage = async (id: string) => {
  const kajian = await kajianModel.findOne({ id });
  const kajianImage = kajian?.image;
  return kajianImage;
};

export const getKajianId = async (id: string) => {
  const kajian = await kajianModel.findOne({ id });
  const kajianId = kajian?.kajian_id;
  return kajianId;
};
