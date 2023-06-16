import { findById } from "../services/userServices.js";
import { getUserByUserId} from "../services/userProfileService.js";
import { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR } from "../errors.js"
import { verifyJwtToken } from "../utils/token.util.js";
import jwt from 'jsonwebtoken';


const COOKIE_NAME = 'auth_token';


export async function checkAuth(req, res, next) {
    try {
      // Check for JWT token in the Authorization header
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next({ status: 403, message: AUTH_TOKEN_MISSING_ERR });
        return;
      }
  
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        next({ status: 403, message: AUTH_TOKEN_MISSING_ERR });
        return;
      }

      let userId;
      try {
        userId = verifyJwtToken(token, next);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          // Handle the expired token case
          return next({ status: 401, message: "Token has expired" });
        } else {
          // Handle other errors
          return next({ status: 403, message: JWT_DECODE_ERR });
        }
      }
  
      const user = await findById(userId);
      const user_profile = await getUserByUserId(userId);
  
      if (!user) {
        next({ status: 404, message: USER_NOT_FOUND_ERR });
        return;
      }
  
      res.locals.userId = user._id;
      res.locals.userName = user_profile.user_name;
      res.locals.gender = user_profile.gender;
  
      next();
    } catch (err) {
      next(err);
    }
  }