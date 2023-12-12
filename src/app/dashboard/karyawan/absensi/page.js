"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard";
import Header from "@/components/dashboard/Header";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useForm } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import toBase64 from "@/lib/base64Convert";
import ContentWrapper from "@/components/dashboard/ContentWrapper";

const Absensi = () => {
  const toast = useToast();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [isAbsented, setIsAbsented] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    setLoading(true);
    console.log(e);
    const imgStr = await toBase64(e.foto[0]);

    const req = await fetch("/api/karyawan/absensi/tambah", {
      method: "POST",
      body: JSON.stringify({ ...e, userId: session?.user?.id, foto: imgStr }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    console.log(res);

    if (res.result !== null) {
      toast({
        title: "Berhasil Menambah Data.",
        description: "Data Absen Berhasil Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsAbsented(true);
    } else {
      toast({
        title: "Gagal Menambah Data.",
        description: "Data Absen Gagal Ditambahakan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const cekAbsen = async () => {
      const req = await fetch(`/api/karyawan/absensi/${session?.user?.id}`);
      const res = await req.json();
      if (res.result) {
        setIsAbsented(
          res.result?.some(
            (i) =>
              new Date(i.tanggal).toLocaleDateString().slice(0, 10) ===
              new Date().toLocaleString().slice(0, 10)
          )
        );
      }
    };

    if (session?.user?.id) {
      cekAbsen();
    }
  }, [session?.user?.id]);

  return (
    <DashboardLayout>
      <Header title={"Absensi Karyawan"} />

      <ContentWrapper>
        {isAbsented ? (
          <Alert status="success">
            <AlertIcon />
            Sudah Melakukan Absensi
          </Alert>
        ) : (
          <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  value={session?.user?.name}
                  // placeholder="Masukkan Nama Pasien"
                  // {...register("nama", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  value={session?.user?.email}
                  // placeholder="Masukkan Nama Pasien"
                  // {...register("nama", { required: true })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Tanggal</FormLabel>
                <Input
                  type="text"
                  value={new Date().toLocaleDateString()}
                  isReadOnly
                  // placeholder="Masukkan Nama Pasien"
                  // {...register("nama", { required: true })}
                />
              </FormControl>
              <FormControl
                isInvalid={errors?.foto?.type === "required" ? true : false}
              >
                <FormLabel>Foto</FormLabel>
                <Input
                  type="file"
                  // value={session?.user?.email}
                  placeholder="Masukkan Foto"
                  {...register("foto", { required: true })}
                />
                {errors?.foto?.type === "required" && (
                  <FormErrorMessage>
                    Mohon Untuk Memasukkan Foto.
                  </FormErrorMessage>
                )}
              </FormControl>
            </SimpleGrid>
            <ButtonGroup my={4}>
              <Button
                colorScheme={"whatsapp"}
                type="submit"
                isLoading={loading}
              >
                Absen
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default Absensi;
