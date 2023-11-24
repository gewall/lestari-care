import prisma from "@/lib/prisma";

export async function POST(req) {
  const data = await req.json();
  const result = await prisma.assesment.findMany({
    where: {
      pasienId: data.id,
    },
  });

  if (result) {
    return Response.json(result);
  } else {
    return Response.json({ error: true });
  }
}
