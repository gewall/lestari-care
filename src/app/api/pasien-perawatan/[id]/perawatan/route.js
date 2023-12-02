import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.id;
  const result = await prisma.perawatan.findMany({
    where: {
      pasienId: id,
    },
  });

  console.log(result);

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
