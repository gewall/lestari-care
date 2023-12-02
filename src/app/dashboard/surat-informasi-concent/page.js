"use client";

import React, { useState } from "react";
import DashboardLayout from "@/layouts/dashboard";
import Header from "@/components/dashboard/Header";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useForm } from "react-hook-form";
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";

const SuratInformasi = () => {
  const router = useRouter();
  const toast = useToast();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    // window.print();
    router.push(
      `/print/surat-informasi?nama=${e.nama}&&ktp=${e.ktp}&&tempat=${e.tempat}&&tanggalLahir=${date}&&alamat=${e.alamat}&&hp=${e.hp}&&namapas=${e.namapas}&&usia=${e.usia}&&diagnosa=${e.diagnosa}&&tindakan=${e.tindakan}`
    );
  };

  return (
    <DashboardLayout>
      <Header title={"Surat Informassi Concent"} />

      <Box
        bgColor={"white"}
        p={4}
        rounded={"md"}
        mt={4}
        borderTopColor={"green.300"}
        borderTopStyle={"solid"}
        borderTopWidth={"4px"}
        w={"100%"}
      >
        <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Nama "
                {...register("nama", { required: true })}
              />
              {errors.nama && (
                <FormErrorMessage>Mohon Masukkan Nama</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>No. Ktp</FormLabel>
              <Input
                type="number"
                placeholder="Masukkan No.Ktp "
                {...register("ktp", { required: true })}
              />
              {errors.noKtp && (
                <FormErrorMessage>Mohon Masukkan No.Ktp</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Alamat</FormLabel>
              <Input
                type="Text"
                placeHolder={"Masukkan Alamat "}
                {...register("alamat", { required: true })}
              />
              {errors.usia && (
                <FormErrorMessage>Mohon Masukkan Alamat</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Tempat, Tanggal Lahir</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Tempat Lahir "
                {...register("tempat", { required: true })}
              />
              <Box my={2} />
              <SingleDatepicker
                name="tanggal-lahir"
                date={date}
                onDateChange={setDate}
              />
            </FormControl>

            <FormControl>
              <FormLabel>No. Telepon</FormLabel>
              <Input
                type="number"
                placeholder="Masukkan No.Telepon "
                {...register("hp", { required: true })}
              />
              {errors.noTelepon && (
                <FormErrorMessage>Mohon Masukkan No.Telepon</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Nama Pasien</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Nama Pasien"
                {...register("namapas", { required: true })}
              />
              {errors.noTelepon && (
                <FormErrorMessage>Mohon Masukkan Nama Pasien</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Usia</FormLabel>
              <Input
                type="number"
                placeholder="Masukkan Usia Pasien"
                {...register("usia", { required: true })}
              />
              {errors.noTelepon && (
                <FormErrorMessage>Mohon Masukkan Usia Pasien</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Diagnosa</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Diagnosa Pasien"
                {...register("diagnosa", { required: true })}
              />
              {errors.noTelepon && (
                <FormErrorMessage>Mohon Masukkan Diagnosa</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Tindakan</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Tindakan Pasien"
                {...register("tindakan", { required: true })}
              />
              {errors.noTelepon && (
                <FormErrorMessage>Mohon Masukkan Tindakan</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
          <ButtonGroup my={4}>
            <Button type="reset" colorScheme={"red"}>
              Reset
            </Button>
            <Button colorScheme={"whatsapp"} type="submit" isLoading={loading}>
              Print
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default SuratInformasi;
