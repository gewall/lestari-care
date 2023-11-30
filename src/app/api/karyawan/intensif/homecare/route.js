import prisma from "@/lib/prisma";

export async function GET(req) {
  //   const _data = await req.json();
  const sParams = req.nextUrl.searchParams;
  const userId = sParams.get("userId");
  const fromDate = sParams.get("fromDate");
  const toDate = sParams.get("toDate");

  const result = await prisma.homecare.findMany({
    where: {
      AND: [
        { userId: userId },
        {
          tanggal: {
            lte: new Date(toDate),
            gt: new Date(fromDate),
          },
        },
      ],
    },
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
