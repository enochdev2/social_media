import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const hassString = async (useValue) =>{

   const hashPassword = await bcrypt.hash(useValue, 10);
   return hashPassword;

}

export const compareString = async (oldValue, userValue) =>{

   const compareStrings = await bcrypt.compare(oldValue, userValue);
   return compareStrings;

};

export const jwtSignIn = (id) => {
 return jwt.sign({userId: id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
}