"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard";
import Header from "@/components/dashboard/Header";
import ContentWrapper from "@/components/dashboard/ContentWrapper";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  IconButton,
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
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Table from "@/components/table/Table";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Link } from "@chakra-ui/next-js";

const PaketPerawatanLuka = () => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTambah, setLoadingTambah] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const {
    register: registerPasien,
    handleSubmit: handleSubmitPasien,

    formState: { errors: errorsPasien },
  } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getData = async () => {
      const req = await fetch("/api/pasien-perawatan");
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setData(res);
    };

    getData();
  }, []);

  const onSearch = async (e) => {
    const req = await fetch(`/api/pasien-perawatan?search=${e.search}`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setData(res);
  };

  const onSubmit = async (e) => {
    setLoadingTambah(true);
    const req = await fetch("/api/pasien-perawatan/tambah", {
      method: "POST",
      body: JSON.stringify(e),
    });

    const res = await req.json();

    if (res?.result !== null) {
      toast({
        title: "Berhasil Menambah Data.",
        description: "Data Pasien Berhasil Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      refreshData();
    } else {
      toast({
        title: "Gagal Menambah Data.",
        description: "Data Pasien Gagal Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoadingTambah(false);
  };

  const refreshData = async () => {
    const req = await fetch("/api/pasien-perawatan");
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setData(res);
  };

  console.log(data);
  return (
    <DashboardLayout>
      <Header title={"Paket Perawatan Luka"} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmitPasien(onSubmit)}>
          <ModalHeader>Tambah Pasien</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan Nama Pasien"
                  {...registerPasien("nama", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Paket</FormLabel>
                <Select
                  type="paket"
                  placeholder="Masukkan Pilihan Paket"
                  {...registerPasien("paket", { required: true })}
                >
                  <option value={"Basic"}>Basic</option>
                  <option value={"Silver"}>Silver</option>
                  <option value={"Gold"}>Gold</option>
                </Select>
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="twitter" mr={3} type="reset">
              Reset
            </Button>
            <Button
              colorScheme={"whatsapp"}
              type="submit"
              isLoading={loadingTambah}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ContentWrapper>
        <Flex alignItems={"center"}>
          <Heading as={"h5"} size={"md"}>
            Pilih Pasien
          </Heading>
          <Spacer />
          {data === null && <Spinner color="green.300" mx={2} />}
        </Flex>
        <Flex
          alignItems={{ base: "flex-end", md: "center" }}
          flexDir={{ base: "column", md: "row" }}
        >
          <HStack
            my={2}
            w={{ base: "full", md: 44 }}
            as={"form"}
            onSubmit={handleSubmit(onSearch)}
          >
            <Input placeholder="Cari Pasien..." {...register("search")} />
            <IconButton
              type="submit"
              aria-label="Search database"
              icon={<AiOutlineSearch />}
            />
          </HStack>
          <Spacer />
          <Button colorScheme={"twitter"} size={"sm"} onClick={onOpen}>
            Tambah Pasien
          </Button>
        </Flex>
        <Table head={["No", "Nama", "Paket", "Aksi"]}>
          {data?.result?.map((item, i) => (
            <Tr key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.nama}</Td>
              <Td>{item.paket}</Td>
              <Td>
                <Link href={`/dashboard/paket-perawatan-luka/${item.id}`}>
                  Detail
                </Link>
              </Td>
            </Tr>
          ))}
        </Table>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default PaketPerawatanLuka;
