import nodemailer from "nodemailer";

export const sendEmail = async (params) => {
  const transporter = nodemailer.createTransport({
    // SMTP - Simple Mail Tranfer Protocol
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: params.email,
    subject: params.subject,
    text: params.message,
  };

  await transporter.sendMail(mailOptions);
};
