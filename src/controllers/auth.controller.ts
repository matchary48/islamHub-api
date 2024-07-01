import { Request, Response, response } from "express";
import { checkPassword, hashPassword } from "../utils/hashing";
import { v4 as uuidv4 } from "uuid";
import {
  createUser,
  findUserByEmail,
  getPassword,
  updateUserPassword,
} from "../services/auth.service";
import { signJWT } from "../utils/jwt";
import validator from "validator";

export const register = async (req: Request, res: Response) => {
  const user_id = uuidv4();
  const { email, name, password } = req.body;
  const image = null;
  const bio = null;
  const role = "user";

  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Invalid email format",
    });
  }

  if (!email || !name || !password) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "All fields are required",
    });
  }

  if (password.length <= 6) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "password must be at least 6 characters",
    });
  }

  const hashedPassword = hashPassword(password);
  const authData = {
    user_id,
    email,
    name,
    password: hashedPassword,
    image,
    bio,
    role,
  };

  try {
    const userEmail = await findUserByEmail(email);

    if (userEmail) {
      return res.status(409).send({
        status: false,
        status_code: 409,
        message: "Email is already registered",
      });
    }

    await createUser(authData);
    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "Register successfully",
      data: authData,
    });
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (req.body.email && !validator.isEmail(req.body.email)) {
      return res.status(400).send({
        status: false,
        status_code: 400,
        message: "Invalid email format",
      });
    }

    if (!email || !password) {
      return res.status(400).send({
        status: false,
        status_code: 400,
        message: "All fields are required",
      });
    }

    try {
      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(401).json({
          status: false,
          status_code: 401,
          message: "Invalid email or password",
        });
      }

      const accessToken = signJWT({ ...user }, { expiresIn: "1d" });

      const validPassword =
        user && typeof user.password === "string"
          ? checkPassword(password, user.password)
          : false;

      if (!validPassword) {
        return res.status(401).json({
          status: false,
          status_code: 401,
          message: "Invalid email or password",
        });
      }

      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Login success",
        data: user,
        token: accessToken,
      });
    } catch (error: any) {
      return res.status(422).send({
        status: false,
        status_code: 422,
        message: error.message,
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

export const getEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Invalid email format",
    });
  }

  if (!email) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Email are required",
    });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: "Email not registered",
        data: {},
      });
    }

    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Password reset successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).send({
      status: false,
      status_code: 500,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Password are required",
    });
  }

  if (password.length <= 6) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "password must be at least 6 characters",
    });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: "User not found",
        data: {},
      });
    }

    const newPassword = hashPassword(password);
    await updateUserPassword(email, newPassword);

    return res.status(200).send({
      status: true,
      status_code: 200,
      message: "Password reset successfully",
      newPassword: newPassword,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).send({
      status: false,
      status_code: 500,
      message: "Internal server error",
    });
  }
};
