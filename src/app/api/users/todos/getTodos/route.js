import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import userModel from "@/models/user";
import mongoConnect from "@/config/mongoConnect";

export async function GET(req) {
  try {
    await mongoConnect();
    const userId = await getDataFromToken(req);
    const user = await userModel
      .findOne({ _id: userId })
      .sort({ task: 1 })
      .select("-password -email");
    const allTodos = user.todos;
    return NextResponse.json({ allTodos });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
