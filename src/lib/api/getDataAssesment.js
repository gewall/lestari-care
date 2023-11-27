export const getDataAssesment = async ({ id }) => {
  const req = await fetch(`/api/assesment/${id}`);
  const res = await req.json();

  if (!req.ok) {
    return { error: "Gagal menbambil data assesment." };
  }

  return res;
};

export const getDetailAsssesment = async ({ menu, id }) => {
  const req = await fetch(`/api/assesment/${menu}/${id}`);
  const res = await req.json();

  if (!req.ok) {
    return { error: "Gagal menbambil data assesment." };
  }

  return res;
};
