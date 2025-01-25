import { routes } from "@/routes";
import { Resend } from "resend";

//const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  email: string;
  subject: string;
  html: string;
}

const sendEmail = async ({
  email,
  subject,
  html,
}: SendEmailParams): Promise<void> => {
  const emailFrom = process.env.RESEND_FROM_EMAIL;
  if (!emailFrom) {
    throw new Error("RESEND_FROM_EMAIL is not set");
  }

  // DEV
  if (process.env.NODE_ENV !== "production") {
    console.log(`------ email:`, html);
  }

  // await resend.emails.send({
  //   to: email,
  //   from: emailFrom,
  //   subject,
  //   html,
  // });
};

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const confirmLink = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }${routes.authNewVerification()}?token=${token}`;
  const html = `<a href="${confirmLink}">Click here to verify your email</a>`;

  await sendEmail({
    email,
    subject: "Verify your email",
    html,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const confirmLink = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }${routes.authNewPassword()}?token=${token}`;
  const html = `<a href="${confirmLink}">Click here to reset password</a>`;

  await sendEmail({
    email,
    subject: "Reset password",
    html,
  });
};

export const sendTwoFactorEmail = async (
  email: string,
  token: string
): Promise<void> => {
  const html = `<p>Your verification code: ${token}</p>`;

  await sendEmail({
    email,
    subject: "Reset password",
    html,
  });
};
