import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import mongoConnect from "@/config/mongoConnect";

export async function POST(req) {
  try {
    const todoData = await req.json();
    await mongoConnect();
    const userId = await getDataFromToken(req);
    const { task } = todoData;
    //console.log(task);
    await userModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { todos: { task } } }
    );
    return NextResponse.json({ success: "Task Added Successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
