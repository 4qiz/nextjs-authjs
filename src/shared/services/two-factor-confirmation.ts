import { prisma } from "../lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const token = await prisma.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return token;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
