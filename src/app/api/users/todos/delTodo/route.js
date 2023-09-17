import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import mongoConnect from "@/config/mongoConnect";

export async function POST(req) {
  try {
    const data = await req.json();
    await mongoConnect();
    const { id } = data[0];
    const userId = await getDataFromToken(req);
    await userModel.updateOne(
      { _id: userId },
      { $pull: { todos: { _id: id } } }
    );
    return NextResponse.json({ success: "Task Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
