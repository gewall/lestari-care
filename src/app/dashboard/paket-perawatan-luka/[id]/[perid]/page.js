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
  Textarea,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useForm } from "react-hook-form";
import prisma from "@/lib/prisma";

const UbahPerawatanPasien = ({ params }) => {
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
    const data = { ...e };
    const req = await fetch(
      `/api/pasien-perawatan/${params.id}/perawatan/${params.perid}/ubah`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      const req = await fetch(
        `/api/pasien-perawatan/${params.id}/perawatan/${params.perid}`
      );
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setDate(new Date(res?.tanggal));

      setData(res);
    };

    getData();
  }, []);
  console.log(data);
  return (
    <DashboardLayout>
      <Header title={"Ubah Riwayat Perawatan Pasien"} />

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
                defaultValue={data?.nama}
                isReadOnly
                // placeholder="Masukkan Nama Barang"
                {...register("nama")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Paket</FormLabel>
              <Input
                type="text"
                defaultValue={data?.paket}
                isReadOnly
                // placeholder="Masukkan paket Barang"
                {...register("paket")}
              />
              {/* <Select
                type="paket"
                // placeholder="Masukkan Pilihan Paket"

                isReadOnly
                {...register("paket")}
              >
                <option value={"Basic"} selected={data?.paket === "Basic"}>
                  Basic
                </option>
                <option value={"Silver"} selected={data?.paket === "Silver"}>
                  Silver
                </option>
                <option value={"Gold"} selected={data?.paket === "Gold"}>
                  Gold
                </option>
              </Select> */}
            </FormControl>
            <FormControl>
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                type="text"
                defaultValue={data?.deskripsi}
                {...register("deskripsi")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Biaya</FormLabel>
              <Input
                type="number"
                defaultValue={data?.biaya}
                {...register("biaya")}
              />
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

export default UbahPerawatanPasien;
