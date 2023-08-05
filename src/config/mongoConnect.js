import mongoose from "mongoose";

export default async function mongoConnect() {
  mongoose.connection.on("connect", (err) => {
    console.log("Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Mongo error");
  });

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todoApp");
  } catch (error) {
    // console.log(error.message);
  }
}
