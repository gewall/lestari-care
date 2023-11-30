import prisma from "@/lib/prisma";

export async function PUT(req) {
  const _data = await req.json();

  const find = await prisma.alkes.findUnique({
    where: {
      id: _data.id,
    },
  });

  if (!find) {
    return Response.json({ error: "error", result: null });
  }

  const result = await prisma.alkes.update({
    where: {
      id: _data.id,
    },
    data: {
      jumlahStok: parseInt(find.jumlahStok) + parseInt(_data.tambah),
    },
  });

  //   biaya,tanggalBayar, assesmentId

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}