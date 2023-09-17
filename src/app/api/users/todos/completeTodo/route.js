import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user";
import mongoConnect from "@/config/mongoConnect";

export async function POST(req) {
  try {
    const data = await req.json();
    await mongoConnect();
    const { id, taskId } = data[0];
    const userId = await getDataFromToken(req);
    const user = await userModel.findOne({ _id: userId });
    const comp = user.todos[taskId].completed;
    await userModel.updateOne(
      { _id: userId, "todos._id": id },
      { $set: { "todos.$.completed": !comp } }
    );
    return NextResponse.json({ success: "Task Updated Successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
