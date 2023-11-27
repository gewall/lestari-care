"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard";
import Header from "@/components/dashboard/Header";
import ContentWrapper from "@/components/dashboard/ContentWrapper";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
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
  Text,
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

const StokBHP = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAmbil,
    onOpen: onOpenAmbil,
    onClose: onCloseAmbil,
  } = useDisclosure();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cekBarang, setCekBarang] = useState(false);
  const [idAmbil, setIdAmbil] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerStock,
    handleSubmit: handleSubmitStok,
    formState: { errors: errorsStock },
  } = useForm();

  const onStockSubmit = async (e) => {
    setLoading(true);

    const req = await fetch("/api/stok/bhp/tambah", {
      method: "POST",
      body: JSON.stringify(e),
    });

    const res = await req.json();

    if (req.ok) {
      toast({
        title: "Berhasil Menyimpan Data.",
        description: "Data Stok Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Gagal Menyimpan Data.",
        description: "Data Stok Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      const req = await fetch("/api/stok/bhp");
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setData(res.result);
    };

    getData();
  }, []);

  const onSearch = async (e) => {
    const req = await fetch(`/api/stok/bhp?search=${e.search}`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setData(res.result);
  };

  const openAmbil = ({ id }) => {
    setIdAmbil(id);
    onOpenAmbil();
  };

  return (
    <DashboardLayout>
      <Header title={"Stok BHP"} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmitStok(onStockSubmit)}>
          <ModalHeader>Tambah Barang</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan Nama Barang"
                  {...registerStock("nama", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Jumlah Stok</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukkan Jumlah Stok Barang"
                  {...registerStock("jumlahStok", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ukuran</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukkan Ukuran Barang"
                  {...registerStock("ukuran", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Harga</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukkan Harga Barang"
                  {...registerStock("harga", { required: true })}
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

      <Modal isOpen={isOpenAmbil} onClose={onCloseAmbil}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmitStok(onStockSubmit)}>
          <ModalHeader>Tambah Barang</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Ambil Stok</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukkan Ambil Barang"
                  {...registerStock("ambil", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
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
        <Flex alignItems={"center"}>
          <HStack my={2} w={44} as={"form"} onSubmit={handleSubmit(onSearch)}>
            <Input placeholder="Cari Barang..." {...register("search")} />
            <IconButton
              type="submit"
              aria-label="Search database"
              icon={<AiOutlineSearch />}
            />
          </HStack>
          <Spacer />
          {data === null && <Spinner color="green.300" mx={4} />}
          <Button colorScheme={"twitter"} onClick={onOpen} size={"sm"}>
            Tambah Barang
          </Button>
        </Flex>
        <Table head={["No", "Nama", "Stok", "Ukuran", "Harga", "Aksi"]}>
          {data?.map((item, i) => (
            <Tr key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.nama}</Td>
              <Td>{item.jumlahStok}</Td>
              <Td>{item.ukuran}</Td>
              <Td>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(item.harga)}
              </Td>

              <Td>
                {/* <Link href={`/dashboard/stok/bhp/${item.id}`}>Detail</Link> */}
                <ButtonGroup>
                  <Button
                    size={"sm"}
                    colorScheme={"twitter"}
                    onClick={() => openAmbil({ id: item.id })}
                  >
                    Ambil
                  </Button>
                  <Button size={"sm"} colorScheme={"whatsapp"}>
                    Tambah
                  </Button>
                  <Button size={"sm"} colorScheme={"red"}>
                    Hapus
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Table>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default StokBHP;
