import prisma from "@/lib/prisma";

export async function POST(req, res) {
  let data = await req.json();

  const result = await prisma.tujuanPerawatan.create({
    data,
  });
  console.log(result);
  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
