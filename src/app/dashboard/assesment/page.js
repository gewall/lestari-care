"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard";
import Header from "@/components/dashboard/Header";
import ContentWrapper from "@/components/dashboard/ContentWrapper";
import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Input,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Table from "@/components/table/Table";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Link } from "@chakra-ui/next-js";

const Assesment = () => {
  const [data, setData] = useState(null);

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

  return (
    <DashboardLayout>
      <Header title={"Assesment"} />

      <ContentWrapper>
        <Heading as={"h5"} size={"md"}>
          Pilih Pasien
        </Heading>
        <HStack my={2} w={44} as={"form"} onSubmit={handleSubmit(onSearch)}>
          <Input placeholder="Cari Pasien..." {...register("search")} />
          <IconButton
            type="submit"
            aria-label="Search database"
            icon={<AiOutlineSearch />}
          />
        </HStack>
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
