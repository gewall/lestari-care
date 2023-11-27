import prisma from "@/lib/prisma";

export async function POST(req) {
  const _data = await req.json();

  const result = await prisma.keuanganAssesment.create({
    data: {
      ..._data,
      biaya: parseInt(_data.biaya),
      tanggalBayar: new Date(),
    },
  });

  //   biaya,tanggalBayar, assesmentId

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
