import authModel from "../models/auth.model";

export const createUser = async (payload: any) => {
  return await authModel.create(payload);
};

export const findUserByEmail = async (email: string) => {
  return await authModel.findOne({ email });
};

export const getPassword = async (email: string) => {
  const user = await authModel.findOne({ email });
  const password = user?.password;
  return password;
};

export const getUserImage = async (user_id: string) => {
  const user = await authModel.findOne({ user_id });
  const image = user?.image;
  return image;
};

export const updateUserPassword = async (
  email: string,
  newPassword: string
) => {
  try {
    await authModel.updateOne({ email }, { password: newPassword });
  } catch (error) {
    throw new Error("Failed to update user password");
  }
};
