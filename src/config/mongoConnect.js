import mongoose from "mongoose";
require("dotenv").config();

export default async function mongoConnect() {
  const uri = process.env.MONGO_URI;
  mongoose.connection.on("connect", (err) => {
    console.log("Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Mongo error");
  });

  try {
    await mongoose.connect(uri);
  } catch (error) {
    // console.log(error.message);
  }
}
