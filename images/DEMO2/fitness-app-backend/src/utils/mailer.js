import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  const link = `http://localhost:5000/api/auth/verify?token=${token}`;

  const transporterproduction = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

    // Ethereal test account
    const testAccount = await nodemailer.createTestAccount();

    // Ethereal SMTP
    const transportertest = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
const transport = transporterproduction ? transporterproduction :  transportertest;
  await transport.sendMail({
    from: `"Fitness App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click below to verify your email:</p><a href="${link}">${link}</a>`,
  });
};
