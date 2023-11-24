import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
export async function POST(req, res) {
  let data = await req.json();

  const _upload = await cloudinary.uploader.upload(data.foto, {
    folder: "klinik",
    resource_type: "image",
  });

  const _data = {
    tipeLuka: data.tipeLuka,
    tipePenyembuhanLuka: data.tipePenyembuhanLuka,
    kunjungan: parseInt(data.kunjungan),
    tanggalKunjungan: data.tanggalKunjungan,
    foto: _upload.public_id,
    assesmentId: data.assesmentId,
  };

  console.log(_upload);
  const result = await prisma.lokalLuka.create({
    data: _data,
  });

  if (result) {
    return Response.json({ result });
  } else {
    return Response.json({ error: "error", result: null });
  }
}
