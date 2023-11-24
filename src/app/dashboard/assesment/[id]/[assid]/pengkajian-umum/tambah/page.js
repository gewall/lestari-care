"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import { createPengkajianUmum } from "@/lib/api/setDataAssesment";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TambahPengkajianUmum = ({ params }) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitPengkajianUmum = async (e) => {
    setLoading(true);
    const submit = await createPengkajianUmum({ val: e, params });

    if (submit.status) {
      toast({
        title: "Berhasil Menyimpan Data.",
        description: "Data Assesment Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push(`/dashboard/assesment/${params.id}/${params.assid}/detail`);
    } else {
      toast({
        title: "Gagal Menyimpan Data.",
        description: "Data Assesment Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <Header title={"Pengkajian Umum"} />

      <ContentWrapper>
        <Box as="form" onSubmit={handleSubmit(onSubmitPengkajianUmum)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mx={2} my={4}>
            <FormControl>
              <FormLabel>
                Riwayat kejadian luka dan perawatan sebelumnya
              </FormLabel>
              <Input
                type="text"
                placeholder="Masukkan riwayat Kejadian Luka"
                {...register("riwayatKejadianLuka", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Faktor penyulit penyembuhan luka</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan faktor penyulit penyembuhan"
                {...register("faktorPenyulitPenyembuhan", {
                  required: true,
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status nutrisi</FormLabel>
              <Select
                defaultValue={"Baik"}
                {...register("statusNutrisi", { required: true })}
              >
                <option value={"Baik"}>Baik</option>
                <option value={"Malnutrisi"}>Malnutrisi</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Penyakit penyerta</FormLabel>
              <Select
                defaultValue={"DM"}
                {...register("penyakitPenyerta", { required: true })}
              >
                <option value={"DM"}>DM</option>
                <option value={"Gangguan Vaskular"}>Gangguan Vaskular</option>
                <option value={"Infeksi"}>Infeksi</option>
                <option value={"Hipertensi"}>Hipertensi</option>
                <option value={"Lainnya"}>Lainnya</option>
              </Select>
              <Box my={2} />
              <Input
                type="text"
                placeholder="Masukkan (-) jika tidak ada tambahan"
                {...register("tambahanPenyakitPenyerta")}
                isReadOnly={false}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Vaskularisasi</FormLabel>
              <Select
                defaultValue={"Baik"}
                {...register("vaskularisasi", { required: true })}
              >
                <option value={"Baik"}>Baik</option>
                <option value={"Kurang Baik"}>Kurang Baik</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Status Psikologis</FormLabel>
              <Select
                defaultValue={"Ada"}
                {...register("statusPsikologis", { required: true })}
              >
                <option value={"Ada"}>Ada</option>
                <option value={"Tidak Ada"}>Tidak Ada</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Mobilisai</FormLabel>
              <Select
                defaultValue={"Jalan"}
                {...register("mobilisasi", { required: true })}
              >
                <option value={"Jalan"}>Jalan</option>
                <option value={"Duduk"}>Duduk</option>
                <option value={"Tirah Baring"}>Tirah Baring</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Obat - obatan yang digunakan</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan obat - obatan yang digunakan"
                {...register("obatObatan", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Merokok</FormLabel>
              <Select
                defaultValue={"Ya"}
                {...register("merokok", { required: true })}
              >
                <option value={"Ya"}>Ya</option>
                <option value={"Tidak"}>Tidak</option>
              </Select>
            </FormControl>
          </SimpleGrid>
          <Flex w={"full"} justifyContent={"flex-end"}>
            <Button
              colorScheme={"whatsapp"}
              type={"submit"}
              isLoading={loading}
            >
              Simpan
            </Button>
          </Flex>
        </Box>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default TambahPengkajianUmum;
