import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  const _data = await req.json();

  const result = await prisma.perawatan.create({
    data: { ..._data, pasienId: params.id, biaya: parseInt(_data.biaya) },
  });

  //   biaya,tanggalBayar, assesmentId

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
