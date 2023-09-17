import { NextResponse } from "next/server";
import mongoConnect from "@/config/mongoConnect";
import userModel from "@/models/user";
import registerValidator from "@/lib/validator";
import * as bcrypt from "bcrypt";

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
    const user = await userModel.findOne({ email });
    if (user)
      return NextResponse.json(
        { message: "Email Already Taken" },
        { status: 401 }
      );
    const saltRounds = await bcrypt.genSalt();
    const pass = await bcrypt.hash(password, saltRounds);
    await userModel.create({ email, password: pass });
    return NextResponse.json({ message: "DATA CREATED SUCCESSFULLY" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
