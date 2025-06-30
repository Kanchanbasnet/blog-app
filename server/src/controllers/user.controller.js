import supabase from "../config/connection.js";
import { compileEmailtemplate, sendEmail } from "../helpers/nodemailer.js";
import { verifyEmail } from "../helpers/verifyEmail.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email);

    if (error) {
      return res.status(500).send(error);
    }
    if (data.length > 0) {
      return res
        .status(409)
        .send({ message: `User with the email ${email} already exists.` });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    await supabase
      .from("users")
      .insert({ email: email, password: hashedPassword })
      .select();
    const verfiedData = verifyEmail(email);

    await supabase
      .from("email_verification")
      .insert({
        email: email,
        otp: verfiedData.otp,
        expires_at: verfiedData.expires,
      })
      .select();
    const template = await compileEmailtemplate("emailTemplate.mjml", {
      email: email,
      otp: verfiedData.otp,
    });
    await sendEmail(email, template);
    return res.status(200).send({ message: "User created Successfully." });
  } catch (error) {
    console.log("An error has been occured::::", error);
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const { data, error: verificationError } = await supabase
      .from("email_verification")
      .select()
      .match({ email: email, otp: otp });

    if (verificationError) {
      return res
        .status(500)
        .send({
          message: "Verification lookup failed",
          error: verificationError,
        });
    }
    if (!data || data.length === 0) {
      return res.status(404).send({ message: "Incorrect OTP number" });
    }
    const { error } = await supabase
      .from("users")
      .update({
        is_verified: true,
      })
      .select()
      .eq("email", email);
    if (error) {
      return res.send({ message: "An error has been occured.", error });
    }

    return res.status(200).send({ message: "User has been verified." });
  } catch (error) {
    console.error("An error has been occured:::", error);
  }
};
