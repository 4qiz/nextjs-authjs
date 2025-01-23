import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

  // DEV
  if (process.env.NODE_ENV !== "production") {
    console.log("---confirm---:", confirmLink);
  }

  await resend.emails.send({
    to: email,
    from: "no-reply@example.com",
    subject: "Verify your email",
    html: `<a href="${confirmLink}">Click here to verify your email</a>`,
  });
};
