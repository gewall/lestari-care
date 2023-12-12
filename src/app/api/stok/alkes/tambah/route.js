import prisma from "@/lib/prisma";

export async function POST(req) {
  const _data = await req.json();

  const result = await prisma.alkes.create({
    data: {
      ..._data,
      jumlahStok: parseInt(_data.jumlahStok),

      harga: parseInt(_data.harga),
    },
  });

  if (!result) {
    return Response.json({ error: "error", result: null });
  }

  const save = await prisma.keuanganStokAlkes.create({
    data: {
      tanggal: new Date(),
      nominal: parseInt(result.harga * _data.jumlahStok),
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
