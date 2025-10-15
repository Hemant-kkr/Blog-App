import { compare } from "bcryptjs";
import isUser from "../services/checkUser.js";
import { accessTokenGenerator, refreshTokenGenerator } from "../utils/generateToken.js";
async function login(req, res,next) {
try {
    const {email, password}=req.body;
    if (!email || !password) {
        const field= !email ? email :password;
        return res.status(400).json({message: `${field} are required`,status:'failed'});
    }
    const isRegisteredUser =  await isUser(email);
    if(!isRegisteredUser){
        return res.status(200).json({message:"User does not exist",status:'failed'});
    }
    const match = await compare(password, isRegisteredUser.password);
    if(!match){
        return res.status(200).json({message:"Invalid credentials",status:'failed'});
    }
    const refreshToken = await refreshTokenGenerator(isRegisteredUser.email);
    const accessToken = await accessTokenGenerator(isRegisteredUser.email);

    res.cookie("accessToken",accessToken,{
    httpOnly:true,
    secure: process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxage:15 * 60 * 1000,
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxage:30*24*60*60*1000,
    })
        res.status(200).json({
      success: true,
      message: "Login successful. Tokens stored in cookies.",
    });
     
} catch (error) {
    next(error)
}    
}
export default login;