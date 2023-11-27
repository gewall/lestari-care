import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const _data = await req.json();

  const _upload = await cloudinary.uploader.upload(_data.foto, {
    folder: "klinik/absensi",
    resource_type: "image",
  });

  const result = await prisma.absensi.create({
    data: {
      ..._data,
      tanggal: new Date(),
      foto: _upload.public_id,
    },
  });

  //   biaya,tanggalBayar, assesmentId

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
