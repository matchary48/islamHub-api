import jwt from "jsonwebtoken";
import CONFIG from "../config/environment";
import { REFUSED } from "dns";

export const signJWT = (
  payload: object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, CONFIG.jwt_public);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        valid: false,
        expired: true,
        decoded: null,
      };
    } else {
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    }
  }
};
