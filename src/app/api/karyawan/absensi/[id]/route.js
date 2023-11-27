import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.id;
  const result = await prisma.absensi.findFirst({
    where: {
      AND: [
        {
          userId: id,
        },
        {
          tanggal: { lte: new Date() },
        },
      ],
    },
  });

  console.log(result, "asdd");

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
