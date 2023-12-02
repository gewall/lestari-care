import prisma from "@/lib/prisma";

export async function PUT(req) {
  const _data = await req.json();
  // const id = params.id;

  const result = await prisma.piutang.update({
    where: {
      id: _data.id,
    },
    data: {
      status: "LUNAS",
    },
  });

  console.log(result, "asd");

  //   biaya,tanggalBayar, assesmentId

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
