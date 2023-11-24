export const getDataPasien = async ({ id }) => {
  const req = await fetch(`/api/pasien/${id}`);
  const res = await req.json();

  if (!req.ok) {
    return { error: "Gagal menbambil data pasien." };
  }

  return res;
};
