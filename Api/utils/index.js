import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const hassString = async (useValue) =>{

   const hashPassword = await bcrypt.hash(useValue, 10);
   return hashPassword;

}

export const compareString = async (oldValue,userValue) =>{

   const compareString = await bcrypt.compare(oldValue, userValue);
   return compareString;

};

export const jwtSignIn = (id) => {
 return jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
}