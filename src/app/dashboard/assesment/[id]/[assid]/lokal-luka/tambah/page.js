"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import { createLokalLuka } from "@/lib/api/setDataAssesment";
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
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TambahLokalLuka = ({ params }) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tanggalKunjungan, setTanggalKunjungan] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    setLoading(true);
    const submit = await createLokalLuka({ val: e, params, tanggalKunjungan });

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
      <Header title={"Lokal Luka"} />

      <ContentWrapper>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mx={2} my={4}>
            <FormControl>
              <FormLabel>Tipe luka</FormLabel>
              <Select
                defaultValue={"Akut"}
                {...register("tipeLuka", { required: true })}
              >
                <option value={"Akut"}>Akut</option>
                <option value={"Kronis"}>Kronis</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Tipe penyembuhan luka</FormLabel>
              <Select
                defaultValue={"Fase Inflamasi"}
                {...register("tipePenyembuhanLuka", {
                  required: true,
                })}
              >
                <option value={"Fase Inflamasi"}>Fase Inflamasi</option>
                <option value={"Fase Proliperasi"}>Fase Proliperasi</option>
                <option value={"Fase Maturase"}>Fase Maturase</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Kunjungan ke</FormLabel>
              <Input
                type="number"
                placeholder="Masukkan kunjungan"
                {...register("kunjungan", { required: true })}
              />
              <Box my={2} />
              <SingleDatepicker
                name="tanggal-kunjungan-input"
                date={tanggalKunjungan}
                onDateChange={setTanggalKunjungan}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Upload foto</FormLabel>
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

export default TambahLokalLuka;
