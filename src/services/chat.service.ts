import authModel from "../models/auth.model";
import chatModel from "../models/chat.model";

export const getAllChat = async () => {
  return await chatModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getChatByCommunityId = async (community_id: string) => {
  return await chatModel.find({ community_id: community_id });
};

export const insertChat = async (payload: any) => {
  return await chatModel.create(payload);
};

export const getChatAndDelete = async (id: string) => {
  try {
    return await chatModel.findOneAndDelete({ chat_id: id });
  } catch (error) {
    throw error;
  }
};
