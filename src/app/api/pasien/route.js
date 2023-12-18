import prisma from "@/lib/prisma";

export async function GET(req) {
  const sParams = req.nextUrl.searchParams;
  const skip = sParams.get("skip") || 0;
  const search = sParams.get("search");
  let result = null;

  if (search) {
    result = await prisma.pasien.findMany({
      skip: parseInt(skip),
      take: 5,
      where: {
        OR: [
          {
            nama: {
              equals: search,
              mode: "insensitive",
            },
          },
          {
            noRM: {
              equals: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  } else {
    result = await prisma.pasien.findMany({
      skip: parseInt(skip),
      take: 5,
    });
  }

  console.log(result, skip);

  if (result) {
    return Response.json(result);
  } else {
    return Response.json({ error: "Gagal" });
  }
}
