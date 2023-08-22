import { UserModel } from "../models/user.js";

import { findByPhone } from "../services/userServices.js";

import {
  PHONE_NOT_FOUND_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} from "../errors.js";

import { createJwtToken } from "../utils/token.util.js";

import { generateOTP, fast2sms } from "../utils/otp.util.js";

const COOKIE_NAME = "auth_token";

// --------------------- User log in using otp ---------------------------------
export async function loginUsingOtp(req, res, next) {
  try {
    const { phone } = req.body;

    var regitser_user = await findByPhone(phone);
    // register if a new user
    if (!regitser_user) {
      res.status(400).json({
        type: "error",
        message: "手机用户不存在，请先注册哦!",
        data: {},
      });

      return;
    }
    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    regitser_user.phoneOtp = otp;
    regitser_user.isAccountVerified = true;
    await regitser_user.save();
    // send otp to phone number
    await fast2sms(otp, regitser_user.phone);
    res.status(201).json({
      type: "success",
      message: "验证码已发送，请查收。",
      data: {
        userId: regitser_user.id,
      },
    });
  } catch (error) {
    console.log("debug error",error)
    if (error.response.status === 403) {
      res.status(403).json({
        type: "error",
        message: "验证码操作频繁，请稍后重试。",
        data: {},
      });
    }
  } finally {
  }
}

// ---------------------- verify phone otp -------------------------

export async function verifyOTP(req, res, next) {
  try {
    const { otp, phone } = req.body;
    const user = await findByPhone(phone);
    if (!user) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }
    if (user.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP_ERR });
      return;
    }
    console.log("[Debug] user", JSON.stringify(user));

    const user_profile = await findByPhone(phone);
    const token = createJwtToken({ userId: user_profile.id });

    // user.phoneOtp = "";
    // await user.save();
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({
      type: "success",
      message: "登录成功",
      data: {
        token,
        userId: user_profile.id,
      },
    });
  } catch (error) {
    next(error);
  }
}

// --------------- fetch current user -------------------------

export async function fetchCurrentUser(req, res, next) {
  try {
    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: res.locals.user,
      },
    });
  } catch (error) {
    next(error);
  }
}

// --------------- admin access only -------------------------

export async function handleAdmin(req, res, next) {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "Okay you are admin!!",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
}
