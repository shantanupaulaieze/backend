import { getAllUser } from "@/controllers/authControllers";

export async function GET(req) {
  return await getAllUser(req);
}
