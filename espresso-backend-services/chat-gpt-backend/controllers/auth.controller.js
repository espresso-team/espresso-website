import { User } from "../models/user.model.js";

import { findByPhone, findById } from "../services/userServices.js";

import { PHONE_NOT_FOUND_ERR, PHONE_ALREADY_EXISTS_ERR, USER_NOT_FOUND_ERR, INCORRECT_OTP_ERR, ACCESS_DENIED_ERR } from "../errors.js";

import { createJwtToken } from "../utils/token.util.js";

import { generateOTP, fast2sms } from "../utils/otp.util.js";

// --------------------- create new user ---------------------------------
export async function loginOrRegisterUser(req, res, next) {
    try {
        const { phone } = req.body;
        const user = await findByPhone(phone);
        // register if a new user
        if (!user) {
            await createNewUser(phone, next);
            user = await findByPhone(phone);
            if (user) {
                res.status(200).json({
                    type: "success",
                    message: "Account created OTP sended to mobile number",
                    data: {
                      userId: user._id,
                    },
                  });
            } else {
                res.status(500).json({
                    type: "error",
                    message: "用户创建失败，请稍后重试。",
                    data: {
                      
                    },
                  });
            }
            
            return;
        }

        res.status(201).json({
            type: "success",
            message: "验证码以发送，请查收。",
            data: {
            userId: user._id,
            },
        });
        // generate otp
        const otp = generateOTP(6);
        // save otp to user collection
        user.phoneOtp = otp;
        user.isAccountVerified = true;
        await user.save();
        // send otp to phone number
        await fast2sms( `验证码是: ${otp}`, user.phone, next);
   } catch (error) {
     next(error);
   }
}

async function createNewUser(phone, next) {
  try {
    // create new user
    const createUser = new User({
      phone,
      role : phone === process.env.ADMIN_PHONE ? "ADMIN" :"USER"
    });

    // save user

    const user = await createUser.save();

    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    await user.save();
    // send otp to phone number
    await fast2sms( `验证码是: ${otp}`, user.phone, next);
  } catch (error) {
    next(error);
  }
}

// ---------------------- verify phone otp -------------------------

export async function verifyOTP(req, res, next) {
  try {
    const { otp, userId } = req.body;
    const user = await findById(userId);
    if (!user) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }

    if (user.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP_ERR });
      return;
    }
    const token = createJwtToken({ userId: user._id });

    user.phoneOtp = "";
    await user.save();

    res.status(201).json({
      type: "success",
      message: "登录成功",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
}


// --------------- fetch current user -------------------------

export async function fetchCurrentUser(req, res, next) {
  try {
    const currentUser = res.locals.user;


    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user:currentUser,
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
        user:currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
}