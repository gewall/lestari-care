import prisma from "@/lib/prisma";

export async function GET(req) {
  //   const _data = await req.json();
  const sParams = req.nextUrl.searchParams;
  const userId = sParams.get("userId");

  const result = await prisma.gajiKaryawan.findMany({
    where: {
      AND: [
        { userId: userId },
        {
          tanggal: {
            lte: new Date(),
          },
        },
      ],
    },
  });

  const isGajian = result.some((item) =>
    new Date(item.tanggal).getMonth() === new Date().getMonth() ? true : false
  );
  console.log(isGajian);
  if (result) {
    return Response.json({ result, isGajian });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
