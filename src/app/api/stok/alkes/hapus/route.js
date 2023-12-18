import prisma from "@/lib/prisma";

export async function DELETE(req) {
  const _data = await req.json();

  const deleteM = await prisma.keuanganStokAlkes.deleteMany({
    where: {
      alkesId: _data.id,
    },
  });
  const result = await prisma.alkes.delete({
    where: {
      id: _data.id,
    },
  });

  //   biaya,tanggalBayar, assesmentId

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
