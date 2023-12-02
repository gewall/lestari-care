import prisma from "@/lib/prisma";

export async function GET(req) {
  const result = await prisma.assesment.findMany();
  console.log(result);
  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
