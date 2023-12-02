import prisma from "@/lib/prisma";

export async function GET(req) {
  const resultBhp = await prisma.keuanganStokBhp.findMany({
    select: {
      tanggal: true,
      nominal: true,
      tipe: true,
    },
  });

  const resultAlkes = await prisma.keuanganStokAlkes.findMany({
    select: {
      tanggal: true,
      nominal: true,
      tipe: true,
    },
  });

  if (resultBhp && resultAlkes) {
    return Response.json({ result: { bhp: resultBhp, alkes: resultAlkes } });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
