import prisma from "@/lib/prisma";

export async function POST(req) {
  const _data = await req.json();

  const result = await prisma.piutang.create({
    data: {
      ..._data,
      jumlah: parseInt(_data.jumlah),
      total: parseInt(_data.total),
      status: "BELUM LUNAS",
    },
  });

  //   biaya,tanggalBayar, assesmentId

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
