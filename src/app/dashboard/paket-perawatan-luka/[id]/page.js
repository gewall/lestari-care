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
  Select,
  SimpleGrid,
  Spacer,
  Spinner,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

// export async function generateStaticParams() {
//   const req = await fetch("/api/pasien");
//   const res = await req.json();

//   return res.map((_res) => ({
//     id: _res.id,
//   }));
// }

const Detail = ({ params }) => {
  const router = useRouter();
  const [dataPasien, setDataPasien] = useState(null);
  const [dataRiwayatPerawatan, setDataRiwayatPerawatan] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDataPasien = async () => {
      const req = await fetch(`/api/pasien-perawatan/${params.id}`);
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setDataPasien(res);
    };

    // const getRiwayatPerawatan = async () => {
    //   const req = await fetch(`/api/assesment`, {
    //     method: "POST",
    //     body: JSON.stringify({ id: params.id }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const res = await req.json();

    //   if (!req.ok) {
    //     return;
    //   }

    //   setDataRiwayatPerawatan(res);
    // };

    // getRiwayatPerawatan();
    getDataPasien();
  }, [params.id]);

  console.log(dataRiwayatPerawatan, "Pas");

  return (
    <DashboardLayout>
      <Header title={"Detail Pasien"} />
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
          {/* <Button
            my={{ base: 2, md: 0 }}
            onClick={async () => {
              setLoading(true);
              const req = await fetch("/api/assesment/tambah", {
                method: "POST",
                body: JSON.stringify({
                  pasienId: params.id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const res = await req.json();

              if (req.ok)
                return router.push(
                  `/dashboard/assesment/${params.id}/${res.id}/detail`
                );

              setLoading(false);
            }}
            colorScheme={"twitter"}
            size={"sm"}
            isLoading={loading}
          >
            Tambah Assesment
          </Button> */}
        </Flex>
        <Box>
          {dataRiwayatPerawatan === null ? (
            <HStack>
              <Text>Mohon Tunggu...</Text>
              <Spinner color="green.300" />
            </HStack>
          ) : dataRiwayatPerawatan.length === 0 ? (
            <Text>Tidak Ada</Text>
          ) : (
            <Table head={["No", "Tanggal Assesment", "Aksi"]}>
              {dataRiwayatPerawatan?.map((item, i) => (
                <Tr key={item.id}>
                  <Td>{i + 1}</Td>
                  <Td>{item.tanggal.slice(0, 10)}</Td>

                  <Td>
                    <Link
                      href={`/dashboard/assesment/${params.id}/${item.id}/detail`}
                    >
                      Detail
                    </Link>
                  </Td>
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
