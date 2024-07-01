import { NextFunction, Request, Response } from "express";
import chatModel from "../models/chat.model";
import communityModel from "../models/community.model";

export const getAllCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  try {
    const count = await communityModel.countDocuments();
    totalItems = count;

    const totalPages = Math.ceil(Number(totalItems) / Number(perPage));

    const community = await communityModel
      .find()
      .sort({ createdAt: -1 })
      .skip(
        (parseInt(currentPage.toString()) - 1) * parseInt(perPage.toString())
      )
      .limit(parseInt(perPage.toString()));

    if (Array.isArray(community) && community.length > 0) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data community successfully",
        data: community,
        total_data: totalItems,
        per_page: parseInt(perPage.toString()),
        current_page: parseInt(currentPage.toString()),
        total_page: totalPages,
      });
    } else {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Get data community successfully",
        data: "No community posted",
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

export const getCommunityByTitle = async (q: string) => {
  return await communityModel.find({ title: { $regex: new RegExp(q, "i") } });
};

export const insertCommunity = async (payload: any) => {
  return await communityModel.create(payload);
};

export const getCommunityById = async (id: string) => {
  return await communityModel.findOne({ community_id: id });
};

export const getIdCommunity = async (id: string) => {
  const community = await communityModel.findOne({ community_id: id });
  const communityId = community?.community_id;
  return communityId;
};

export const getUserId = async (id: string) => {
  const user = await communityModel.findOne({ user_id: id });
  const userId = user?.user_id;
  return userId;
};

export const getCommunityAndDelete = async (id: string) => {
  try {
    const community = await communityModel.findOne({ community_id: id });

    if (!community) {
      throw new Error("Community not found");
    }

    const deleteCommunityResult = await communityModel.findOneAndDelete({
      community_id: id,
    });

    const deleteChatResult = await chatModel.deleteMany({ community_id: id });

    return { deleteCommunityResult, deleteChatResult };
  } catch (error) {
    throw error;
  }
};

export const getCommunityImage = async (id: string) => {
  const community = await communityModel.findOne({ id });
  const communityImage = community?.image;
  return communityImage;
};

export const getCommuityAndUpdate = async (id: string, payload: any) => {
  return await communityModel.findOneAndUpdate(
    {
      community_id: id,
    },
    {
      $set: payload,
    }
  );
};
