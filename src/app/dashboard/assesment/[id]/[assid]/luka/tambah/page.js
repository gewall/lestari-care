"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import { createLuka } from "@/lib/api/setDataAssesment";
import {
  Box,
  Button,

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

const TambahLuka = ({ params }) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    setLoading(true);
    // console.log(e);
    const submit = await createLuka({ val: e, params });

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
      <Header title={"Luka"} />

      <ContentWrapper>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mx={2} my={4}>
            <FormControl>
              <FormLabel>Stadium Luka</FormLabel>
              <Select
                defaultValue={"1"}
                {...register("stadiumLuka", {
                  required: true,
                })}
              >
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"Unstage"}>Unstage</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Ukuran Luka</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Ukuran Luka"
                {...register("ukuranLuka", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Goa/Undermining</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Goa/Undermining"
                {...register("goa", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Exudate/Cairan Luka</FormLabel>
              <Select
                defaultValue={"Purulen"}
                {...register("exudate", {
                  required: true,
                })}
              >
                <option value={"Purulen"}>Purulen</option>
                <option value={"Hemopurulen"}>Hemopurulen</option>
                <option value={"Serous"}>Serous</option>
                <option value={"Hemoserous"}>Hemoserous</option>
                <option value={"Unstage"}>Unstage</option>
              </Select>
              <Box my={2} />
              <Select
                defaultValue={"Sedikit"}
                {...register("pilihExudate", {
                  required: true,
                })}
              >
                <option value={"Sedikit"}>Sedikit</option>
                <option value={"Sedang"}>Sedang</option>
                <option value={"Banyak"}>Banyak</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Warna Dasar Luka</FormLabel>
              <Select
                defaultValue={"Merah"}
                {...register("warnaDasarLuka", {
                  required: true,
                })}
              >
                <option value={"Merah"}>Merah</option>
                <option value={"Kuning"}>Kuning</option>
                <option value={"Hitam"}>Hitam</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Dasar Luka</FormLabel>
              <Select
                defaultValue={"Menyatu"}
                {...register("dasarLuka", {
                  required: true,
                })}
              >
                <option value={"Menyatu"}>Menyatu</option>
                <option value={"Tidak"}>Tidak</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Tepi Luka</FormLabel>
              <Select
                defaultValue={"Tebal"}
                {...register("tepiLuka", {
                  required: true,
                })}
              >
                <option value={"Tebal"}>Tebal</option>
                <option value={"Tipis"}>Tipis</option>
                <option value={"Halus"}>Halus</option>
                <option value={"Kaku"}>Kaku</option>
                <option value={"Edema"}>Edema</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Kulit Sekitar Luka</FormLabel>
              <Select
                defaultValue={"Iritasi"}
                {...register("kulitSekitarLuka", {
                  required: true,
                })}
              >
                <option value={"Iritasi"}>Iritasi</option>
                <option value={"Masarasi"}>Masarasi</option>
                <option value={"Kemerahan"}>Kemerahan</option>
                <option value={"Edema"}>Edema</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Tanda Infeksi</FormLabel>
              <Select
                defaultValue={"Ada"}
                {...register("tandaInfeksi", {
                  required: true,
                })}
              >
                <option value={"Ada"}>Ada</option>
                <option value={"Tidak Ada"}>Tidak Ada</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Skala Nyeri (1-10)</FormLabel>
              <Input
                type="number"
                placeholder="Masukkan Skala Nyeri"
                {...register("skalaNyeri", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pemeriksaan Penunjang</FormLabel>
              <Select
                defaultValue={"Ada"}
                {...register("pemeriksaanPenunjang", {
                  required: true,
                })}
              >
                <option value={"Lab"}>Lab</option>
                <option value={"CT Angio"}>CT Angio</option>
                <option value={"USG Vaskular"}>USG Vaskular</option>
                <option value={"Rontgen"}>Rontgen</option>
                <option value={"Lainnya"}>Lainnya</option>
              </Select>
              <Box my={2} />
              <Input
                type="text"
                placeholder="Masukkan Tambahan"
                {...register("pemeriksaanPenunjangTambahan", { required: true })}
              />
              <Box my={2} />
              <Input
                type="file"
                placeholder="Masukkan Foto"
                {...register("foto", { required: true })}
              />
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

export default TambahLuka;
