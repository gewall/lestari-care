import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.id;
  const result = await prisma.pasien.findUnique({
    where: {
      id,
    },
  });

  if (result) {
    return Response.json(result);
  } else {
    return Response.json({ error: "Gagal" });
  }
}
