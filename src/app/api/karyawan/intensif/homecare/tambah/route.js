import prisma from "@/lib/prisma";

export async function POST(req) {
  const _data = await req.json();

  //   console.log(hash);

  const result = await prisma.homecare.create({
    data: _data,
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
