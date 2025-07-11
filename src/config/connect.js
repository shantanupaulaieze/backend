import { connect } from "mongoose";

export async function connectDB() {
  try {
    await connect(process.env.NEXT_PUBLIC_MONGO_URL, {
      dbName: "chat_bot",
    });
    console.log("DB IS CONNECTED");
  } catch (error) {
    console.log("DB IS NOT CONNECTED", error);
  }
}
