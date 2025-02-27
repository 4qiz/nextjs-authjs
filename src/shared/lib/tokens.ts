import { v4 as uuidv4 } from "uuid";
import { getTokenByEmail } from "../services/verification-token";
import { prisma } from "./db";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "../services/two-factor-confirmation";

const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + EXPIRATION_TIME);
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  // cringe arhitecture (should be moved to services)
  const newToken = await prisma.twoFactorToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return newToken;
};
