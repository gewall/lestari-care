-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'KARYAWAN');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "role" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pasien" (
    "id" UUID NOT NULL,
    "nama" TEXT NOT NULL,
    "noKtp" BIGINT NOT NULL,
    "usia" INTEGER NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3),
    "noTelepon" BIGINT NOT NULL,
    "noRM" TEXT,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assesment" (
    "id" UUID NOT NULL,
    "tanggal" TIMESTAMP(3),
    "pasienId" UUID NOT NULL,

    CONSTRAINT "Assesment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PengkajianUmum" (
    "id" UUID NOT NULL,
    "riwayatKejadianLuka" TEXT NOT NULL,
    "faktorPenyulitPenyembuhan" TEXT NOT NULL,
    "statusNutrisi" TEXT NOT NULL,
    "penyakitPenyerta" TEXT NOT NULL,
    "tambahanPenyakitPenyerta" TEXT NOT NULL,
    "vaskularisasi" TEXT NOT NULL,
    "statusPsikologis" TEXT NOT NULL,
    "mobilisasi" TEXT NOT NULL,
    "obatObatan" TEXT NOT NULL,
    "merokok" TEXT NOT NULL,
    "assesmentId" UUID NOT NULL,

    CONSTRAINT "PengkajianUmum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LokalLuka" (
    "id" UUID NOT NULL,
    "tipeLuka" TEXT NOT NULL,
    "tipePenyembuhanLuka" TEXT NOT NULL,
    "kunjungan" INTEGER NOT NULL,
    "tanggalKunjungan" TIMESTAMP(3),
    "foto" TEXT NOT NULL,
    "assesmentId" UUID NOT NULL,

    CONSTRAINT "LokalLuka_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ttv" (
    "id" UUID NOT NULL,
    "tekananDarah" TEXT NOT NULL,
    "nadi" TEXT NOT NULL,
    "pernafasan" TEXT NOT NULL,
    "suhu" TEXT NOT NULL,
    "gds" TEXT NOT NULL,
    "hasilAbpi" TEXT NOT NULL,
    "assesmentId" UUID NOT NULL,

    CONSTRAINT "Ttv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Luka" (
    "id" UUID NOT NULL,
    "stadiumLuka" TEXT NOT NULL,
    "ukuranLuka" TEXT NOT NULL,
    "goa" TEXT NOT NULL,
    "exudate" TEXT NOT NULL,
    "pilihExudate" TEXT NOT NULL,
    "warnaDasarLuka" TEXT NOT NULL,
    "dasarLuka" TEXT NOT NULL,
    "tepiLuka" TEXT NOT NULL,
    "kulitSekitarLuka" TEXT NOT NULL,
    "tandaInfeksi" TEXT NOT NULL,
    "skalaNyeri" INTEGER,
    "pemeriksaanPenunjang" TEXT NOT NULL,
    "pemeriksaanPenunjangTambahan" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "assesmentId" UUID NOT NULL,

    CONSTRAINT "Luka_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TujuanPerawatan" (
    "id" UUID NOT NULL,
    "angkatJaringan" BOOLEAN NOT NULL,
    "angkatBendaAsing" BOOLEAN NOT NULL,
    "rangsangGranulasi" BOOLEAN NOT NULL,
    "percepatProsesInflamasi" BOOLEAN NOT NULL,
    "cegahInfeksi" BOOLEAN NOT NULL,
    "angkatBiofilm" BOOLEAN NOT NULL,
    "ciptakanKelembaban" BOOLEAN NOT NULL,
    "jagaKelembaban" BOOLEAN NOT NULL,
    "serapCairanLuka" BOOLEAN NOT NULL,
    "lindungiKulit" BOOLEAN NOT NULL,
    "dukungProsesEpitelisasi" BOOLEAN NOT NULL,
    "tipiskanTepiLuka" BOOLEAN NOT NULL,
    "kurangiFaktorPenekanan" BOOLEAN NOT NULL,
    "kurangiNyeri" BOOLEAN NOT NULL,
    "atasiBau" BOOLEAN NOT NULL,
    "atasiHipergranulasi" BOOLEAN NOT NULL,
    "implementasi" TEXT NOT NULL,
    "evaluase" TEXT NOT NULL,
    "rencanaTindakan" TEXT NOT NULL,
    "assesmentId" UUID NOT NULL,

    CONSTRAINT "TujuanPerawatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeuanganAssesment" (
    "id" UUID NOT NULL,
    "biaya" INTEGER NOT NULL,
    "tanggalBayar" TIMESTAMP(3) NOT NULL,
    "assesmentId" UUID NOT NULL,

    CONSTRAINT "KeuanganAssesment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BHP" (
    "id" UUID NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlahStok" INTEGER NOT NULL,
    "ukuran" TEXT NOT NULL,
    "tipeStok" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "BHP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alkes" (
    "id" UUID NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlahStok" INTEGER NOT NULL,
    "ukuran" TEXT NOT NULL,
    "tipeStok" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "Alkes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeuanganStokAlkes" (
    "id" UUID NOT NULL,
    "tanggal" TIMESTAMP(3),
    "nominal" INTEGER NOT NULL,
    "tipe" TEXT NOT NULL,
    "alkesId" UUID NOT NULL,

    CONSTRAINT "KeuanganStokAlkes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeuanganStokBhp" (
    "id" UUID NOT NULL,
    "tanggal" TIMESTAMP(3),
    "nominal" INTEGER NOT NULL,
    "tipe" TEXT NOT NULL,
    "bhpId" UUID NOT NULL,

    CONSTRAINT "KeuanganStokBhp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" UUID NOT NULL,
    "tanggal" TIMESTAMP(3),
    "foto" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homecare" (
    "id" UUID NOT NULL,
    "deskripsi" TEXT,
    "tanggal" TIMESTAMP(3),
    "bagian" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Homecare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homevisit" (
    "id" UUID NOT NULL,
    "deskripsi" TEXT,
    "tanggal" TIMESTAMP(3),
    "bagian" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Homevisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GajiKaryawan" (
    "id" UUID NOT NULL,
    "tanggal" TIMESTAMP(3),
    "nominal" INTEGER NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "GajiKaryawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasienPerawatan" (
    "id" UUID NOT NULL,
    "nama" TEXT NOT NULL,
    "paket" TEXT NOT NULL,

    CONSTRAINT "PasienPerawatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perawatan" (
    "id" UUID NOT NULL,
    "biaya" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3),
    "deskripsi" TEXT NOT NULL,
    "pasienId" UUID NOT NULL,

    CONSTRAINT "Perawatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Piutang" (
    "id" UUID NOT NULL,
    "namaPerusahaan" TEXT NOT NULL,
    "jenisProduk" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "noFaktur" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Piutang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_noRM_key" ON "Pasien"("noRM");

-- CreateIndex
CREATE UNIQUE INDEX "PengkajianUmum_assesmentId_key" ON "PengkajianUmum"("assesmentId");

-- CreateIndex
CREATE UNIQUE INDEX "LokalLuka_assesmentId_key" ON "LokalLuka"("assesmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Ttv_assesmentId_key" ON "Ttv"("assesmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Luka_assesmentId_key" ON "Luka"("assesmentId");

-- CreateIndex
CREATE UNIQUE INDEX "TujuanPerawatan_assesmentId_key" ON "TujuanPerawatan"("assesmentId");

-- CreateIndex
CREATE UNIQUE INDEX "KeuanganAssesment_assesmentId_key" ON "KeuanganAssesment"("assesmentId");

-- AddForeignKey
ALTER TABLE "Assesment" ADD CONSTRAINT "Assesment_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "Pasien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengkajianUmum" ADD CONSTRAINT "PengkajianUmum_assesmentId_fkey" FOREIGN KEY ("assesmentId") REFERENCES "Assesment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LokalLuka" ADD CONSTRAINT "LokalLuka_assesmentId_fkey" FOREIGN KEY ("assesmentId") REFERENCES "Assesment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ttv" ADD CONSTRAINT "Ttv_assesmentId_fkey" FOREIGN KEY ("assesmentId") REFERENCES "Assesment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Luka" ADD CONSTRAINT "Luka_assesmentId_fkey" FOREIGN KEY ("assesmentId") REFERENCES "Assesment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TujuanPerawatan" ADD CONSTRAINT "TujuanPerawatan_assesmentId_fkey" FOREIGN KEY ("assesmentId") REFERENCES "Assesment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeuanganAssesment" ADD CONSTRAINT "KeuanganAssesment_assesmentId_fkey" FOREIGN KEY ("assesmentId") REFERENCES "Assesment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeuanganStokAlkes" ADD CONSTRAINT "KeuanganStokAlkes_alkesId_fkey" FOREIGN KEY ("alkesId") REFERENCES "Alkes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeuanganStokBhp" ADD CONSTRAINT "KeuanganStokBhp_bhpId_fkey" FOREIGN KEY ("bhpId") REFERENCES "BHP"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homecare" ADD CONSTRAINT "Homecare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homevisit" ADD CONSTRAINT "Homevisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GajiKaryawan" ADD CONSTRAINT "GajiKaryawan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perawatan" ADD CONSTRAINT "Perawatan_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "PasienPerawatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
