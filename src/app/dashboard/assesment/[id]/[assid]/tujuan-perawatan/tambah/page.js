"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import { createTujuanPerawatan } from "@/lib/api/setDataAssesment";
import {
  Box,
  Button,
  Center,
  Checkbox,
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

const TambahTujuanPerawatan = ({ params }) => {
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
    const submit = await createTujuanPerawatan({ val: e, params });

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
      <Header title={"Tujuan Perawatan"} />

      <ContentWrapper>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Angkat Jaringan Nekrosis/Debridemang</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("angkatJaringan")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Angkat Benda Asing (Benang, Dll)</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("angkatBendaAsing")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Rangsang Granulasi</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("rangsangGranulasi")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Percepat Proses Inflamasi</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("percepatProsesInflamasi")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Cegah/Atasi Infeksi</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("cegahInfeksi")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Angkat Bersihkan Biofilm</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("angkatBiofilm")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Ciptakan Kelembaban</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("ciptakanKelembaban")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Pertahan dan Jaga Kelembaban Seimbang</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("jagaKelembaban")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Serap dan Tamping Cairan Luka</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("serapCairanLuka")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Lindungi Kulit Sekitar Luka</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("lindungiKulit")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Dukung Proses Epitelisasi</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("dukungProsesEpitelisasi")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Tipiskan Tepi Luka</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("tipiskanTepiLuka")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Kurangi Faktor Penekanan Pada Luka</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("kurangiFaktorPenekanan")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Kurangi Nyeri</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("kurangiNyeri")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Atasi Bau Tidak Sedap</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("atasiBau")}
              ></Checkbox>
            </FormControl>
            <FormControl display={"flex"} justifyContent={"space-between"}>
              <FormLabel>Atasi Hipergranulasi</FormLabel>
              <Checkbox
                size={"lg"}
                colorScheme={"whatsapp"}
                {...register("atasiHipergranulasi")}
              ></Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Implementasi</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Implementasi"
                {...register("implementasi", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Evaluase</FormLabel>
              <Select
                defaultValue={"S"}
                {...register("evaluase", {
                  required: true,
                })}
              >
                <option value={"S"}>S</option>
                <option value={"O"}>O</option>
                <option value={"A"}>A</option>
                <option value={"P"}>P</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Rencana Tindakan selanjutnya</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Rencana Tindakan Selanjutnya"
                {...register("rencanaTindakan", { required: true })}
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

export default TambahTujuanPerawatan;
