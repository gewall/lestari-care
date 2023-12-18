import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const _data = await req.json();
  const id = params.perid;

  const result = await prisma.perawatan.update({
    where: {
      id,
    },
    data: {
      biaya: parseInt(_data.biaya),
      deskripsi: _data.deskripsi,
      tanggal: new Date(_data.tanggal),
    },
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "Gagal", result: null });
  }
}
