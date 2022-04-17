import express from "express";
import { createUser, getUserByEmail } from "../Helper.js";
import { genPassword } from "../Helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();
router.route("/signup").post(async (request, response) => {
  try {
    const { email, password } = request.body;
    const userFromDB = await getUserByEmail(email);
    console.log("user", userFromDB);

    if (userFromDB) {
      return response.status(400).json({ message: "user already exists." });
    }

    if (password.length < 8) {
      return response
        .status(400)
        .json({ message: "Pass should be greater than 8 chars." });
    }

    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
    ) {
      return response.status(400).json({ message: "Password doesnot match" });
    }

    const hashpassword = await genPassword(password);
    const result = await createUser({ email, password: hashpassword });
    console.log(result);
    console.log(email, password);
    response.status(200).json(result);
  } catch (err) {
    return response.status(500).json(err);
  }
});

router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;

  const userFromDB = await getUserByEmail(email);

  if (!userFromDB) {
    response.status(400).send({ message: "Invalid credentials" });
    return;
  }
  const storedPassword = userFromDB.password;
  console.log("pas", storedPassword);
  //to compare stored password and typed password is same
  const isPasswordMatch = await bcrypt.compare(password, storedPassword);

  console.log(isPasswordMatch);
  console.log(userFromDB);
  if (isPasswordMatch) {
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
    console.log("tokk", token);
    response.send({ message: "successful login", token: token });
  } else {
    response.status(400).send({ message: "Invalid credentials" });
  }
});

export const usersRouter = router;
