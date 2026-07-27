import prisma from '../config/prisma.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function loginUser(data) {
  
  if (!data.email || !data.password) {
    throw new Error("Email and password are required.");
  }

  const user = await prisma.user.findUnique({
      where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign (
    {id: user.id }, process.env.JWT_SECRET, {expiresIn: '7d'});

  return {
  token,
  user: {
    id: user.id,
    username: user.username,
    email: user.email
  }
};
}

export async function registerUser(data) {

  if (!data.username || !data.email || !data.password) {
    throw new Error("Username, email and password are required.");
  }

  const existingUsername = await prisma.user.findUnique({
    where: {
        username: data.username
    }
  });

  if (existingUsername) {
    throw new Error("Username already exists.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      username: data.username || null,
      email: data.email,
      password: hashedPassword
    }
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email
  };
}