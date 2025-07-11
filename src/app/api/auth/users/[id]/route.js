import { getAllUser } from "@/controllers/authControllers";

export async function GET(req ,{params}) {
    const {id} = await params;
  return await getAllUser(req , id);
}
