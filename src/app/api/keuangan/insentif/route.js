import prisma from "@/lib/prisma";

export async function GET(req) {
  const sParams = req.nextUrl.searchParams;
  const fromDate = sParams.get("fromDate");
  const toDate = sParams.get("toDate");

  const result = await prisma.gajiKaryawan.findMany({
    select: {
      nominal: true,
      tanggal: true,
    },
    where: {
      tanggal: {
        lte: new Date(toDate),
        gt: new Date(fromDate),
      },
    },
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
