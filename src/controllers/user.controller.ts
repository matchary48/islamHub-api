import { Request, Response } from "express";
import {
  getAllUser,
  getImage,
  getUserAndDelete,
  getUserAndUpdate,
  getUserById,
} from "../services/user.service";
import validator from "validator";
import { findUserByEmail, getPassword } from "../services/auth.service";

export const getUsers = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (id) {
    const user = await getUserById(id);
    if (user) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data user successfully",
        data: user,
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
    try {
      const users = await getAllUser();
      if (Array.isArray(users) && users.length > 0) {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "Get data user success",
          data: users,
        });
      } else {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "No user",
          data: {},
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        status_code: 500,
        message: "Internal Server Error",
        data: {},
      });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, bio, user_id, image } = req.body;
  // const image = req.file ? req.file.originalname : null;

  let imagePrevious;

  if (image) {
    imagePrevious = image;
  } else {
    imagePrevious = await getImage(user_id);
  }

  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Invalid email format",
    });
  }

  if (!name || !email) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Fields are required",
    });
  }

  const userEmail = await findUserByEmail(email);
  if (userEmail) {
    return res.status(409).send({
      status: false,
      status_code: 409,
      message: "Email is already registered",
    });
  }

  const userData = {
    id: id,
    user_id,
    name,
    image: imagePrevious,
    email,
    bio,
  };

  try {
    const user = await getUserAndUpdate(id, userData);
    if (user) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "User updated successfully",
        data: userData,
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

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await getUserAndDelete(id);
    if (result) {
      res.status(200).json({
        status: true,
        status_code: 200,
        message: "Delete User successfully",
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