import prisma from "@/lib/prisma";

export async function POST(req) {
  const res = await prisma.user.findUnique({
    where: {
      email: "admin@gmail.com",
    },
  });

  if (res) {
    return Response.json(res);
  } else {
    return Response.json({ error: "EEAAA" });
  }
}
