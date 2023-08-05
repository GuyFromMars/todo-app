import { NextResponse } from "next/server";
import mongoConnect from "@/config/mongoConnect";
import userModel from "@/models/user";
import registerValidator from "@/app/lib/validator";

export async function POST(req) {
  try {
    const reqData = await req.json();

    const validated = registerValidator(reqData);
    if (!validated)
      return new Response("An error occured", {
        status: 500,
      });
    const { email, password } = reqData;
    await mongoConnect();
    await userModel.create({ email, password });
    return NextResponse.json({ data: "DATA CREATED SUCCESSFULLY" });
  } catch (error) {
    console.log(error);
    return new Response("An error occured", {
      status: 500,
    });
  }
}
