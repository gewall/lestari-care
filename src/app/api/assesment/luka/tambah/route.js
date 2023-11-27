import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export async function POST(req, res) {
  let data = await req.json();

  const _upload = await cloudinary.uploader.upload(data.foto, {
    folder: "klinik",
    resource_type: "image",
  });

  data = {
    ...data,
    foto: _upload.public_id,
    skalaNyeri: parseInt(data.skalaNyeri),
  };

  const result = await prisma.luka.create({
    data,
  });
  console.log(result);
  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
