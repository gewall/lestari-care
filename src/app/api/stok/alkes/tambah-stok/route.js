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

  if (!result) {
    return Response.json({ error: "error", result: null });
  }

  const save = await prisma.keuanganStokAlkes.create({
    data: {
      tanggal: new Date(),
      nominal: parseInt(result.harga * _data.tambah),
      alkesId: result.id,
      tipe: "MASUK",
    },
  });

  //   biaya,tanggalBayar, assesmentId

  if (save) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
