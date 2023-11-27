import prisma from "@/lib/prisma";

export async function GET(req) {
  const result = await prisma.user.findMany({
    where: {
      role: "KARYAWAN",
    },
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
