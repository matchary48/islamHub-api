import authModel from "../models/auth.model";

export const getAllUser = async () => {
  return await authModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserById = async (id: string) => {
  return await authModel.findOne({ user_id: id });
};

export const getImage = async (user_id: string) => {
  const user = await authModel.findOne({ user_id });
  const image = user?.image;
  return image;
};

export const getImageForBlog = async (user_blog_id: string) => {
  const user = await authModel.findOne({ user_id: user_blog_id });
  const image = user?.image;
  return image;
};

export const getName = async (user_blog_id: string) => {
  const user = await authModel.findOne({ user_id: user_blog_id });
  const name = user?.name;
  return name;
};

export const getImageForVideo = async (user_video_id: string) => {
  const user = await authModel.findOne({ user_id: user_video_id });
  const image = user?.image;
  return image;
};

export const getNameForVideo = async (user_video_id: string) => {
  const user = await authModel.findOne({ user_id: user_video_id });
  const name = user?.name;
  return name;
};

export const getUserAndUpdate = async (id: string, payload: any) => {
  return await authModel.findOneAndUpdate(
    {
      user_id: id,
    },
    {
      $set: payload,
    }
  );
};

export const getUserAndDelete = async (id: string) => {
  return await authModel.findOneAndDelete({ user_id: id });
};
