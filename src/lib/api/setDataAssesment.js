import toBase64 from "../base64Convert";

export const createPengkajianUmum = async ({ val, params }) => {
  const data = { ...val, assesmentId: params.assid };

  const req = await fetch("/api/assesment/pengkajian-umum/tambah", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();

  if (req.ok) {
    return { result: res, status: true };
  } else {
    return { result: null, status: false };
  }
};

export const createLokalLuka = async ({ val, params, tanggalKunjungan }) => {
  const imgStr = await toBase64(val.foto[0]);

  const data = {
    ...val,
    assesmentId: params.assid,
    foto: imgStr,
    tanggalKunjungan,
  };

  const req = await fetch("/api/assesment/lokal-luka/tambah", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const res = await req.json();

  if (req.ok) {
    return { result: res, status: true };
  } else {
    return { result: null, status: false };
  }
};

export const createVVT = async ({ val, params }) => {
  const data = { ...val, assesmentId: params.assid };

  const req = await fetch("/api/assesment/ttv/tambah", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();

  if (req.ok) {
    return { result: res, status: true };
  } else {
    return { result: null, status: false };
  }
};

export const createLuka = async ({ val, params }) => {
  const data = { ...val, assesmentId: params.assid };

  const req = await fetch("/api/assesment/luka/tambah", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();

  if (req.ok) {
    return { result: res, status: true };
  } else {
    return { result: null, status: false };
  }
};

export const createTujuanPerawatan = async ({ val, params }) => {
  const data = { ...val, assesmentId: params.assid };

  const req = await fetch("/api/assesment/tujuan-perawatan/tambah", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();

  if (req.ok) {
    return { result: res, status: true };
  } else {
    return { result: null, status: false };
  }
};
