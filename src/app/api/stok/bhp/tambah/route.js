import prisma from "@/lib/prisma";

export async function POST(req) {
  const _data = await req.json();

  const result = await prisma.bHP.create({
    data: {
      ..._data,
      jumlahStok: parseInt(_data.jumlahStok),
      ukuran: parseInt(_data.ukuran),
      harga: parseInt(_data.harga),
    },
  });

  if (!result) {
    return Response.json({ error: "error", result: null });
  }

  const save = await prisma.keuanganStokBhp.create({
    data: {
      tanggal: new Date(),
      nominal: parseInt(result.harga * _data.jumlahStok),
      bhpId: result.id,
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
