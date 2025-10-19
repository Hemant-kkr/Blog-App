import jwt from 'jsonwebtoken';
export async function verificationToken(email) {
if(!email) return null;
const payload={
    userEmail:email
}
const token= jwt.sign(payload,process.env.EMAIL_VERIFICATION_TOKEN_SECRET,{expiresIn:'1h'});
return token;
}

export async function verifyEmailToken(token){
    if(!token) return null;
    try {
        const decodedToken =jwt.verify(token,process.env.EMAIL_VERIFICATION_TOKEN_SECRET);
        return decodedToken;
    }catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new Error("Email verification token has expired. Please request a new one.");
          } else if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid email verification token.");
          } else {
            throw new Error("Failed to verify email verification token.");
          } 
        }
}
