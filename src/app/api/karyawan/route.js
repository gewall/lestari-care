import prisma from "@/lib/prisma";

export async function GET(req) {
  const sParams = req.nextUrl.searchParams;
  const skip = sParams.get("skip") || 0;
  const search = sParams.get("search");
  let result = null;

  result = await prisma.user.findMany({
    where: {
      role: "KARYAWAN",
    },
    skip,
    take: 5,
  });

  if (search) {
    result = await prisma.user.findMany({
      where: {
        AND: [{ role: "KARYAWAN" }, { name: search }],
      },
      skip,
      take: 5,
    });
  } else {
    result = await prisma.user.findMany({
      where: {
        role: "KARYAWAN",
      },
      skip,
      take: 5,
    });
  }

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
