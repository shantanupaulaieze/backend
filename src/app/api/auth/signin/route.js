import { signin } from "@/controllers/authControllers";

export async function POST(req) {
  return await signin(req);
}