import prisma from "@/lib/prisma";

export async function POST(req, res) {
  let data = await req.json();

  data = { ...data, tanggal: new Date() };

  const result = await prisma.assesment.create({
    data,
  });

  console.log(result);

  if (result) {
    return Response.json(result);
  } else {
    return Response.json({ error: "Gagal" });
  }
}
