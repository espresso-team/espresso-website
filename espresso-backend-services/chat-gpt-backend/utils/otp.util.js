import Core from '@alicloud/pop-core';
import dotenv from 'dotenv';
dotenv.config();
var client = new Core({
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
    // securityToken: '<your-sts-token>', // use STS Token
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  });



var requestOption = {
    method: 'POST'
};



export function generateOTP(otp_length) {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export async function fast2sms(code, contactNumber, next) {
  var code_json = {"code":code};
  try {
    var params = {
      "PhoneNumbers": contactNumber,
      "TemplateCode": "SMS_154950909",
      "SignName": "阿里云短信测试",
      "TemplateParam": JSON.stringify(code_json)
    }
    client.request('SendSms', params, requestOption).then((result) => {
        console.log(JSON.stringify(result));
    })
  } catch (error) {
    next(error);
  }
}