import nodemailer from "nodemailer";
const sendMail = async (req, res) => {
  const { name, email, number, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `Message from ${name}`,
      text: `Sender email: ${email}
      Name: ${name}
      Number: ${number}
      Message: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default sendMail;
