import prisma from "@/lib/prisma";

export async function GET(req) {
  const result = await prisma.gajiKaryawan.findMany({
    select: {
      nominal: true,
      tanggal: true,
    },
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
