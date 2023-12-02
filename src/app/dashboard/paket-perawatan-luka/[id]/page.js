"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import Table from "@/components/table/Table";
import DashboardLayout from "@/layouts/dashboard";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spacer,
  Spinner,
  Td,
  Text,
  Textarea,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// export async function generateStaticParams() {
//   const req = await fetch("/api/pasien");
//   const res = await req.json();

//   return res.map((_res) => ({
//     id: _res.id,
//   }));
// }

const Detail = ({ params }) => {
  const toast = useToast();
  const router = useRouter();
  const [dataPasien, setDataPasien] = useState(null);
  const [dataRiwayatPerawatan, setDataRiwayatPerawatan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getDataPasien = async () => {
      const req = await fetch(`/api/pasien-perawatan/${params.id}`);
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setDataPasien(res);
    };

    const getRiwayatPerawatan = async () => {
      const req = await fetch(`/api/pasien-perawatan/${params.id}/perawatan`);
      console.log(req, "req");
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setDataRiwayatPerawatan(res);
    };

    getDataPasien();
    getRiwayatPerawatan();
  }, [params.id]);

  const onSubmit = async (e) => {
    setLoading(true);
    const data = {
      ...e,
      tanggal: new Date(),
    };
    const req = await fetch(`/api/pasien-perawatan/${params.id}/tambah`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await req.json();

    if (!req.ok)
      return toast({
        title: "Gagal Menambah Data.",
        description: `Data Perawatan Gagal Ditnambah`,
        status: "Error",
        duration: 9000,
        isClosable: true,
      });

    toast({
      title: "Berhasil Mengubah Data.",
      description: `Data Perawatan Berhasil Diubah`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    refreshData();
    setLoading(false);
  };

  console.log(dataRiwayatPerawatan, "Pas");

  const refreshData = async () => {
    const req = await fetch(`/api/pasien-perawatan/${params.id}/perawatan`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setDataRiwayatPerawatan(res);
  };

  return (
    <DashboardLayout>
      <Header title={"Detail Pasien"} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Tambah Perawatan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  value={dataPasien?.nama}
                  isReadOnly
                  // placeholder="Masukkan Nama Barang"
                  // {...register("deskripsi", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Paket</FormLabel>
                <Input
                  type="text"
                  value={dataPasien?.paket}
                  isReadOnly
                  // placeholder="Masukkan Nama Barang"
                  // {...register("deskripsi", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Deskripsi</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Masukkan Deskripsi Perawatan"
                  {...register("deskripsi", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Biaya</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukkan Biaya Perawatan"
                  {...register("biaya", { required: true })}
                />
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="twitter" mr={3} type="reset">
              Reset
            </Button>
            <Button colorScheme={"whatsapp"} type="submit" isLoading={loading}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ContentWrapper>
        {dataPasien === null ? (
          <HStack>
            <Text>Mohon Tunggu...</Text>
            <Spinner color="green.300" />
          </HStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} as={"form"}>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input
                isReadOnly
                type="text"
                // placeholder="Masukkan Nama Pasien"
                value={dataPasien.nama}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Paket</FormLabel>
              <Input
                isReadOnly
                type="text"
                // placeholder="Masukkan No.Ktp Pasien"
                value={dataPasien.paket}
              />
            </FormControl>
          </SimpleGrid>
        )}
        <Flex my={2} flexDir={{ base: "column", md: "row" }}>
          <Heading as={"h5"} size={"md"}>
            Riwayat Perawatan Luka
          </Heading>
          <Spacer />
          {/* <Link href={`/dashboard/assesment/${params.id}/tambah-assesment`}>
            Tambah Assesment
          </Link> */}
          <Button
            my={{ base: 2, md: 0 }}
            colorScheme={"twitter"}
            size={"sm"}
            onClick={onOpen}
          >
            Tambah Perawatan
          </Button>
        </Flex>
        <Box>
          {dataRiwayatPerawatan === null ? (
            <HStack>
              <Text>Mohon Tunggu...</Text>
              <Spinner color="green.300" />
            </HStack>
          ) : dataRiwayatPerawatan?.result?.length === 0 ? (
            <Text>Tidak Ada</Text>
          ) : (
            <Table head={["No", "Deskripsi", "Tanggal Perawatan", "Biaya"]}>
              {dataRiwayatPerawatan?.result?.map((item, i) => (
                <Tr key={item.id}>
                  <Td>{i + 1}</Td>
                  <Td>{item.deskripsi}</Td>
                  <Td>{item.tanggal.slice(0, 10)}</Td>
                  <Td>{item.biaya}</Td>
                </Tr>
              ))}
            </Table>
          )}
        </Box>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default Detail;
