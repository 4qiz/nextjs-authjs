import { v4 as uuidv4 } from "uuid";
import { getTokenByEmail } from "../services/verification-token";
import { prisma } from "./db";

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + EXPIRATION_TIME);
  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { token: existingToken.token },
    });
  }

  // cringe arhitecture (should be moved to services)
  const newToken = await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return newToken;
};
