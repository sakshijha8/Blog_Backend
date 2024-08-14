import nodemailer from "nodemailer";
export const sendMail = async (str: String, data: any) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sakshijha882@gmail.com", // generated ethereal user
      pass: "ukdkvbxbiciowcxb", // generated ethereal password
    },
  });

  var Osubject, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing ${data.name}`;
    Ohtml = `
        <h1>Welcome</h1>
        Hope you have a good time !
        Here are your details-
        Email- ${data.email}
        `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
        <h1>Email.com</h1>
        Here is your link to reset your password !
        ${data.resetPasswordLink}
        `;
  }

  let info = await transporter.sendMail({
    from: "sakshijha882@gmail.com", // sender address <${userObj.email}>
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // plain text body
    html: Ohtml, // html body
  });
};
