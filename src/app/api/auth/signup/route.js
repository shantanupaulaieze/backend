import { signup } from "@/controllers/authControllers";

export async function POST(req) {
  return await signup(req);
}

