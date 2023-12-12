import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.perid;
  const pasid = params.id;
  const result = await prisma.perawatan.findUnique({
    where: {
      id,
    },
  });

  const pasien = await prisma.pasienPerawatan.findUnique({
    where: {
      id: pasid,
    },
  });

  if (result) {
    return Response.json({ ...result, ...pasien });
  } else {
    return Response.json({ error: "Gagal", result: null });
  }
}
