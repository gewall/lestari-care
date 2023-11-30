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
  HStack,
  Heading,
  IconButton,
  Input,
  Spacer,
  Spinner,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Table from "@/components/table/Table";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Link } from "@chakra-ui/next-js";

const Assesment = () => {
  const [data, setData] = useState(null);
  const [skip, setSkip] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getData = async () => {
      const req = await fetch("/api/pasien");
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

  const onNext = async (val) => {
    let _skip = skip + val;
    const req = await fetch(`/api/pasien?skip=${_skip}`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setSkip(skip + val);
    setData(res);
  };

  const onBack = async (val) => {
    let _skip = skip - val;
    const req = await fetch(`/api/pasien?skip=${_skip}`);
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setSkip(skip - val);
    setData(res);
  };

  console.log(skip);

  return (
    <DashboardLayout>
      <Header title={"Assesment"} />

      <ContentWrapper>
        <Flex>
          <Heading as={"h5"} size={"md"}>
            Pilih Pasien
          </Heading>
          <Spacer />
          {data === null && <Spinner color="green.300" />}
        </Flex>
        <Flex alignItems={"center"}>
          <HStack my={2} w={44} as={"form"} onSubmit={handleSubmit(onSearch)}>
            <Input placeholder="Cari Pasien..." {...register("search")} />
            <IconButton
              type="submit"
              aria-label="Search database"
              icon={<AiOutlineSearch />}
            />
          </HStack>
          <Spacer />
          <ButtonGroup>
            <IconButton
              variant="outline"
              colorScheme="teal"
              onClick={() => onBack(5)}
              size={"sm"}
              icon={<AiOutlineArrowLeft />}
            />
            <IconButton
              variant="outline"
              colorScheme="teal"
              size={"sm"}
              onClick={() => onNext(5)}
              icon={<AiOutlineArrowRight />}
            />
          </ButtonGroup>
        </Flex>
        <Table
          head={[
            "No",
            "Nama",
            "No.RM",
            "Usia",
            "Jenis Kelamin",
            "No.Telp",
            "Aksi",
          ]}
        >
          {data?.map((item, i) => (
            <Tr key={item.id}>
              <Td>{i + 1}</Td>
              <Td>{item.nama}</Td>
              <Td>{item.noRM}</Td>
              <Td>{item.usia}</Td>
              <Td>{item.jenisKelamin}</Td>
              <Td>{item.noTelepon}</Td>
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

export default Assesment;
