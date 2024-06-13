import { Request, Response, RequestHandler } from "express";
import Bcrypt from "bcrypt";
import { RegisterSchema } from "../Helpers/validation";
import mssql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../config";
import { IUser, Payload } from "../Models/User";
import Jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const id = uid();

    const { NAME, EMAIL, PASSWORD } = req.body;

    const { error } = RegisterSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    //hashing the password
    const hashedPassword = await Bcrypt.hash(PASSWORD, 10);
    //make a connection to the server
    const pool = await mssql.connect(sqlConfig);

    //make a request
    await pool
      .request()
      .input("ID", id)
      .input("NAME", NAME)
      .input("EMAIL", EMAIL)
      .input("PASSWORD", hashedPassword)
      .execute("addUser");

    return res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { EMAIL, PASSWORD } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const user = (
      await pool.request().input("EMAIL", EMAIL).execute("getUsers")
    ).recordset as IUser[];

    if (user.length !== 0) {
      const isValid = await Bcrypt.compare(PASSWORD, user[0].UPASSWORD);

      if (isValid) {
        const payload: Payload = {
          SUB: user[0].ID,
          UNAME: user[0].UNAME,
        };

        const token = Jwt.sign(payload, process.env.SECRET_KEY as string, {
          expiresIn: "1h",
        });

        return res.status(200).json({ message: "Login successful", token });
      }
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    //
    return res.status(500).json({ message: "Something went wrong " + error });
  }
};
