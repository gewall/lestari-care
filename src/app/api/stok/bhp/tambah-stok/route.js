import prisma from "@/lib/prisma";

export async function PUT(req) {
  const _data = await req.json();

  const find = await prisma.bHP.findUnique({
    where: {
      id: _data.id,
    },
  });

  if (!find) {
    return Response.json({ error: "error", result: null });
  }

  let result;

  if (_data.hargaBaru.length === 0) {
    result = await prisma.bHP.update({
      where: {
        id: _data.id,
      },
      data: {
        jumlahStok: parseInt(find.jumlahStok) + parseInt(_data.tambah),
      },
    });
  } else {
    result = await prisma.bHP.update({
      where: {
        id: _data.id,
      },
      data: {
        jumlahStok: parseInt(find.jumlahStok) + parseInt(_data.tambah),
        harga: parseInt(_data.hargaBaru),
      },
    });
  }

  if (!result) {
    return Response.json({ error: "error", result: null });
  }

  const save = await prisma.keuanganStokBhp.create({
    data: {
      tanggal: new Date(),
      nominal: parseInt(result.harga * _data.tambah),
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
