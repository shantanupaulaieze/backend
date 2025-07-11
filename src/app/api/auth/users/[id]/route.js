import { getUserById } from "@/controllers/authControllers";

export async function GET(req, context) {
  const { id } = await context.params;

  return await getUserById(id);
}
