import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.id;
  const result = await prisma.keuanganAssesment.findUnique({
    where: {
      assesmentId: id,
    },
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
