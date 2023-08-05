import { NextResponse } from "next/server";
import mongoConnect from "@/config/mongoConnect";
import userModel from "@/models/user";

export async function POST(req) {
  try {
    const reqData = await req.json();

    const { email, password } = reqData;
    await mongoConnect();
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!(user && password !== user.password))
      new Response("email or password is incorrect", {
        status: 500,
      });

    return new Response("authenticated", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occured", {
      status: 500,
    });
  }
}
