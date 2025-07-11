import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "kjsdfigbsdbfhb";

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(password, hash) {
  return await bcrypt.compare(password, hash);
}


export function createToken(User) {
  return jwt.sign(
    { userid: User._id, name: User.name, email: User.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
