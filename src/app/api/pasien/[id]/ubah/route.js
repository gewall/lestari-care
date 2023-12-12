import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const id = params.id;
  let data = await req.json();
  data = {
    ...data,
    noKtp: parseInt(data.noKtp),
    usia: parseInt(data.usia),
    noTelepon: parseInt(data.noTelepon),
  };
  const result = await prisma.pasien.update({
    where: {
      id,
    },
    data: data,
  });

  if (result) {
    return Response.json(result);
  } else {
    return Response.json({ error: "Gagal" });
  }
}
