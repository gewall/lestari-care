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

  if (parseInt(find.jumlahStok) < parseInt(_data.ambil))
    return Response.json({ error: "error", result: null });

  const result = await prisma.alkes.update({
    where: {
      id: _data.id,
    },
    data: {
      jumlahStok: parseInt(find.jumlahStok) - parseInt(_data.ambil),
    },
  });

  if (!result) {
    return Response.json({ error: "error", result: null });
  }

  const save = await prisma.keuanganStokAlkes.create({
    data: {
      tanggal: new Date(),
      nominal: parseInt(find.harga * _data.ambil),
      alkesId: _data.id,
      tipe: "KELUAR",
    },
  });

  //   biaya,tanggalBayar, assesmentId

  if (save) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
