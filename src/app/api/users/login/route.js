import { NextResponse } from "next/server";
import mongoConnect from "@/config/mongoConnect";
import userModel from "@/models/user";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const reqData = await req.json();

    const { email, password } = reqData;
    await mongoConnect();
    const user = await userModel.findOne({ email });
    if (!(user && bcrypt.compareSync(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        {
          status: 401,
        }
      );
    } else {
      const tokenData = {
        id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const response = NextResponse.json({
        message: "Login Successful",
        success: true,
      });
      response.cookies.set("token", token, { httpOnly: true });
      return response;
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
