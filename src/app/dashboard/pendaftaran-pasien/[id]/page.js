"use client";

import React, { useEffect, useState } from "react";
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

const UbahPasien = ({ params }) => {
  const toast = useToast();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    setLoading(true);
    const data = { ...e, tanggalLahir: date };
    const req = await fetch(`/api/pasien/${params.id}/ubah`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    console.log(res);

    if (!res.error) {
      toast({
        title: "Berhasil Menambah Data.",
        description: "Data Pasien Berhasil Diubah.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Gagal Menambah Data.",
        description: "Data Pasien Gagal Diubah.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      const req = await fetch(`/api/pasien/${params.id}`);
      const res = await req.json();

      if (!req.ok) {
        return;
      }
      setDate(new Date(res?.tanggalLahir));

      setData(res);
    };

    getData();
  }, []);
  console.log(date);
  return (
    <DashboardLayout>
      <Header title={"Ubah Pasien"} />

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
                placeholder={"Masukkan Nama Pasien"}
                defaultValue={data?.nama}
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
                placeholder="Masukkan No.Ktp Pasien"
                defaultValue={data?.noKtp}
                {...register("noKtp", { required: true })}
              />
              {errors.noKtp && (
                <FormErrorMessage>Mohon Masukkan No.Ktp</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Usia</FormLabel>
              <Input
                type="number"
                placeHolder={"Masukkan Usia Pasien"}
                defaultValue={data?.usia}
                {...register("usia", { required: true })}
              />
              {errors.usia && (
                <FormErrorMessage>Mohon Masukkan Usia</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Select
                defaultValue={data?.jenisKelamin}
                {...register("jenisKelamin", { required: true })}
              >
                <option value={"L"}>Laki - Laki</option>
                <option value={"P"}>Perempuan</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Tempat, Tanggal Lahir</FormLabel>
              <Input
                defaultValue={data?.tempatLahir}
                type="text"
                placeholder="Masukkan Tempat Lahir Pasien"
                {...register("tempatLahir", { required: true })}
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
                defaultValue={data?.noTelepon}
                placeholder="Masukkan No.Telepon Pasien"
                {...register("noTelepon", { required: true })}
              />
              {errors.noTelepon && (
                <FormErrorMessage>Mohon Masukkan No.Telepon</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>No. RM</FormLabel>
              <Input
                type="text"
                defaultValue={data?.noRM}
                placeholder="Masukkan No.RM Pasien"
                {...register("noRM", { required: true })}
              />
              {errors.noTelepon && (
                <FormErrorMessage>Mohon Masukkan No.RM</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
          <ButtonGroup my={4}>
            <Button colorScheme={"whatsapp"} type="submit" isLoading={loading}>
              Simpan
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default UbahPasien;
