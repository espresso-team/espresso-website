import { findById } from "../services/userServices.js";

import { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR } from "../errors.js"
import { verifyJwtToken } from "../utils/token.util.js"


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
  
      const userId = verifyJwtToken(token, next);
  
      if (!userId) {
        next({ status: 403, message: JWT_DECODE_ERR });
        return;
      }
  
      const user = await findById(userId);
  
      if (!user) {
        next({ status: 404, message: USER_NOT_FOUND_ERR });
        return;
      }
  
      res.locals.user = user;
  
      next();
    } catch (err) {
      next(err);
    }
  }