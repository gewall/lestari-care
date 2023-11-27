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

const Insentif = () => {
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
    register: registerKaryawan,
    handleSubmit: handleSubmitKaryawan,

    formState: { errors: errorsKaryawan },
  } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getData = async () => {
      const req = await fetch("/api/karyawan");
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setData(res);
    };

    getData();
  }, []);

  const onSearch = async (e) => {
    const req = await fetch(`/api/pasien?search=${e.search}`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setData(res);
  };

  const onSubmit = async (e) => {
    setLoadingTambah(true);
    const req = await fetch("/api/karyawan/tambah", {
      method: "POST",
      body: JSON.stringify(e),
    });

    const res = await req.json();

    if (res?.result !== null) {
      toast({
        title: "Berhasil Menambah Data.",
        description: "Data Karyawan Berhasil Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Gagal Menambah Data.",
        description: "Data Karyawan Gagal Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoadingTambah(false);
  };

  console.log(data);
  return (
    <DashboardLayout>
      <Header title={"Insentif"} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmitKaryawan(onSubmit)}>
          <ModalHeader>Tambah Karyawan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan Nama Karyawan"
                  {...registerKaryawan("name", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="email"
                  placeholder="Masukkan Email Karyawan"
                  {...registerKaryawan("email", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl isInvalid={errorsKaryawan?.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan Password Karyawan"
                  {...registerKaryawan("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errorsKaryawan?.password && (
                  <FormErrorMessage>Masukkan Minimal 6 Huruf</FormErrorMessage>
                )}
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
            Pilih Karyawan
          </Heading>
          <Spacer />
          {data === null && <Spinner color="green.300" mx={2} />}
          <Button colorScheme={"twitter"} size={"sm"} onClick={onOpen}>
            Tambah Karyawan
          </Button>
        </Flex>
        <HStack my={2} w={44} as={"form"} onSubmit={handleSubmit(onSearch)}>
          <Input placeholder="Cari Pasien..." {...register("search")} />
          <IconButton
            type="submit"
            aria-label="Search database"
            icon={<AiOutlineSearch />}
          />
        </HStack>
        <Table head={["No", "Nama", "Email", "Aksi"]}>
          {data?.result?.map((item, i) => (
            <Tr key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>
                <Link href={`/dashboard/assesment/${item.id}`}>Detail</Link>
              </Td>
            </Tr>
          ))}
        </Table>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default Insentif;
