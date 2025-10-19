// import isUser from "../services/checkUser.js";
// import userModel from "../models/model.user.js";
// import sendEmail from "../services/mailsender.js";
// import verificationToken from "../utils/emailVerificationToken.js";
// async function register(req,res) {
//     const body = req.body;
//     const user = body.user;
//     // console.log(user);
//     if(!user.username || !user.email || !user.password || !user.role)
//     {
//         return res.status(400).json({message:"All fields are required",status:'failed'});
//     }
//     //checking for preexisted user or not
//     const existenceStatus =  await isUser(user.email);
//     // console.log(existenceStatus)
//     if(existenceStatus){
//         return res.status(409).json({message:"User already exists",status:'failed'});
//     }
//       const newUser = new userModel({
//         username: user.username,
//         email: user.email,
//         password: user.password,
//         role: 'user'
//       });
//       const registeredUser=await newUser.save();
//       if(!registeredUser){
//         return res.status(500).json({message:"Unable to register user",status:'failed'});
//       }
//       //generate email verification token
//       const emailToken = await verificationToken(registeredUser.email);
//       if(!emailToken){
//         return res.status(500).json({message:"Unable to generate email verification token",status:'failed'});
//       }
//      const verifyURL = `${process.env.BASE_URL}/api/auth/verify/?token=${emailToken}`;
//      const text=`Please verify your email by clicking the link below:\n ${verifyURL}`;
//      const html=`
//        <div style="font-family: sans-serif; text-align: center;">
//       <h2>Welcome to Our App!</h2>
//       <p>Click the button below to verify your email:</p>
//       <a href="${verifyURL}" style="
//         display: inline-block;
//         padding: 10px 20px;
//         background-color: #007bff;
//         color: white;
//         text-decoration: none;
//         border-radius: 5px;
//         font-weight: bold;
//       ">Verify Email</a>
//       <p>If the button doesn't work, copy and paste this link into your browser:</p>
//       <p><a href="${verifyURL}">${verifyURL}</a></p>
//     </div>
//      `
//       const EmailResponse = await sendEmail(registeredUser.email,"Verify your email to activate your account",text,html);
//       if(!EmailResponse) res.status(500).json({message:"user registered but unable to send Email",status:'failed'});

//       return res.status(201).json({message:"User registered successfully",status:'success',Response:EmailResponse});

// }
// export default register;

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appErrors.js";
import isUser from "../services/checkUser.js";
import userModel from "../models/model.user.js";
import sendEmail from "../services/mailsender.js";
import { verificationToken } from "../utils/emailVerificationToken.js";
const register = catchAsync(async (req, res, next) => {
  const body = req.body;
  const user = body.user;

  if (!user.name || !user.email || !user.password || !user.role) {
    throw new AppError("All feilds required", 400);
  }

  const existenceStatus = await isUser(user.email);
  if (existenceStatus) {
    throw new AppError("User already exists", 409);
  }

  // 3️ Save new user
  const newUser = new userModel({
    username: user.name,
    email: user.email,
    password: user.password,
    role: "user",
  });
  const registeredUser = await newUser.save();
  if (!registeredUser) {
    throw new AppError("Unable to register user", 500);
  }

  // 4️ Generate email verification token
  const emailToken = await verificationToken(registeredUser.email);
  if (!emailToken) {
    throw new AppError("Unable to generate email verification token ", 500);
  }
  // 5️ Prepare verification email
  const verifyURL = `${process.env.BASE_URL}/api/auth/verify/?token=${emailToken}`;
  const text = `Please verify your email by clicking the link below:\n ${verifyURL}`;
  const html = `
    <div style="font-family: sans-serif; text-align: center;">
      <h2>Welcome to Our App!</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${verifyURL}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      ">Verify Email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${verifyURL}">${verifyURL}</a></p>
    </div>
  `;

  const EmailResponse = await sendEmail(
    registeredUser.email,
    "Verify your email to activate your account",
    text,
    html
  );

  if (!EmailResponse) {
    throw new AppError("User registered but unable to send Email", 500);
  }
  // 6️ Send final success response
  res.status(201).json({
    message: "User registered successfully",
    status: "success",
    response: EmailResponse,
  });
});
export default register;
