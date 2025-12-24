import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (req, res) => {
  const { name, email, number, message } = req.body;

  try {
    const msg = {
      to: process.env.EMAIL,        // admin / receiver
      from: process.env.EMAIL,      // verified sender
      replyTo: email,               // user email
      subject: `Message from ${name}`,
      text: `Sender email: ${email}
Name: ${name}
Number: ${number}
Message: ${message}`,
    };

    await sgMail.send(msg);

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.log("SendGrid API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default sendMail;
