import prisma from "@/lib/prisma";

export async function POST(req, res) {
  let data = await req.json();
  data = {
    ...data,
 
    usia: parseInt(data.usia),

  };

  const result = await prisma.pasien.create({
    data: data,
  });

  if (result) {
    return Response.json(result);
  } else {
    return Response.json({ error: "Gagal" });
  }
}
