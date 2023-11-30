import prisma from "@/lib/prisma";

export async function GET(req) {
  const sParams = req.nextUrl.searchParams;
  const skip = sParams.get("skip") || 0;
  const search = sParams.get("search");
  let result = null;

  console.log(search);

  if (search) {
    result = await prisma.pasienPerawatan.findMany({
      skip,
      take: 5,
      where: {
        nama: search,
      },
    });
  } else {
    result = await prisma.pasienPerawatan.findMany({
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
