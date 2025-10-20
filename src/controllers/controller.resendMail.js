import isUser from '../services/checkUser.js';
import sendEmail from '../services/mailsender.js';
import AppError from '../utils/appErrors.js';
import catchAsync from '../utils/catchAsync.js';
import {verificationToken} from '../utils/emailVerificationToken.js';



const resendMail = catchAsync(async (req, res, next) => {
  const body = req.body; // from middleware (logged-in user)
  const reqUser=body.user;
  // 1️ Fetch user from DB
  const user = await isUser(reqUser.email);
  if (!user) {
    throw new AppError("User not registered yet", 400);
  }

  // 2️ Check if user is already verified
  if (user.isVerified) {
    return res.status(400).json({
      status: "failed",
      message: "User is already verified",
    });
  }

  // 3️ Generate email verification token
  const emailToken = await verificationToken(user.email);
  if (!emailToken) {
    throw new AppError("Unable to generate email verification token", 500);
  }

  // 4️ Prepare verification email
  const verifyURL = `${process.env.BASE_URL}/api/auth/verify?token=${emailToken}`;
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

  // 5️ Send email
  const EmailResponse = await sendEmail(
    user.email,
    "Verify your email to activate your account",
    text,
    html
  );

  if (!EmailResponse) {
    throw new AppError("User registered but unable to send email", 500);
  }

  // 6️ Send response to client
  return res.status(200).json({
    status: "success",
    message: "Verification email resent successfully",
    data: { email: user.email },
  });
});

export default resendMail;
