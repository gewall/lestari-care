import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
export async function POST(req) {
  const _data = await req.json();

  const hash = await bcrypt.hash(_data.password, 12);

  //   console.log(hash);

  const data = { ..._data, password: hash, role: "KARYAWAN" };

  const result = await prisma.user.create({
    data,
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
