import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const id = params.id;
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  //   const decrypt = await bcrypt.

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
