import prisma from "@/lib/prisma";

export async function POST(req) {
  const _data = await req.json();

  const result = await prisma.gajiKaryawan.create({
    data: {
      ..._data,
      tanggal: new Date(),
      nominal: parseInt(_data.nominal),
      userId: _data.userId,
    },
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
