import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import nodemailer from "nodemailer";
import ejs from "ejs";

let config = {
    host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
};

function createTransport(config: any) {
  return nodemailer.createTransport(config);
}
//before ejs
// let messageOptions = {
//   to: process.env.EMAIL_ADDRESS,
//   from: process.env.EMAIL_ADRESS,
//   subject: "Products",
//   html: "<h1>Hello there</h1>",
// };
async function sendMail(messageOptions: any) {
  let transporter = createTransport(config);
  // try {
  await transporter.verify();

  await transporter.sendMail(messageOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  });
  // } catch (error) {

  // }
}
//before ejs
// sendMail(messageOptions);

//after ejs
ejs.renderFile(
  "../../Template/register.ejs",
  { name: "Linton Maina" },
  (err, data) => {
    let messageOptions = {
      to: process.env.EMAIL_ADDRESS1,
      from: process.env.EMAIL_ADDRESS,
      subject: "Products",
      html: data,
    };
    sendMail(messageOptions);
  }
);
