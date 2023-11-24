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
  const [dataRiwayatAssesment, setDataRiwayatAssesment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDataPasien = async () => {
      const req = await fetch(`/api/pasien/${params.id}`);
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setDataPasien(res);
    };

    const getRiwayatAsessment = async () => {
      const req = await fetch(`/api/assesment`, {
        method: "POST",
        body: JSON.stringify({ id: params.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setDataRiwayatAssesment(res);
    };

    getRiwayatAsessment();
    getDataPasien();
  }, [params.id]);

  console.log(dataRiwayatAssesment, "Pas");

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
                placeholder="Masukkan Nama Pasien"
                value={dataPasien.nama}
              />
            </FormControl>

            <FormControl>
              <FormLabel>No. Ktp</FormLabel>
              <Input
                isReadOnly
                type="number"
                placeholder="Masukkan No.Ktp Pasien"
                value={dataPasien.noKtp}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Usia</FormLabel>
              <Input
                isReadOnly
                type="number"
                placeHolder={"Masukkan Usia Pasien"}
                value={dataPasien.usia}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Input
                isReadOnly
                type="text"
                placeholder="Masukkan Tempat Lahir Pasien"
                value={dataPasien.jenisKelamin}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Tempat, Tanggal Lahir</FormLabel>
              <Input
                isReadOnly
                type="text"
                placeholder="Masukkan Tempat Lahir Pasien"
                value={
                  dataPasien.tempatLahir +
                  ", " +
                  dataPasien.tanggalLahir.slice(0, 10)
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>No. Telepon</FormLabel>
              <Input
                isReadOnly
                type="number"
                placeholder="Masukkan No.Telepon Pasien"
                value={dataPasien.noTelepon}
              />
            </FormControl>
          </SimpleGrid>
        )}
        <Flex my={2}>
          <Heading as={"h5"} size={"md"}>
            Riwayat Assesment
          </Heading>
          <Spacer />
          {/* <Link href={`/dashboard/assesment/${params.id}/tambah-assesment`}>
            Tambah Assesment
          </Link> */}
          <Button
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
          </Button>
        </Flex>
        <Box>
          {dataRiwayatAssesment === null ? (
            <HStack>
              <Text>Mohon Tunggu...</Text>
              <Spinner color="green.300" />
            </HStack>
          ) : dataRiwayatAssesment.length === 0 ? (
            <Text>Tidak Ada</Text>
          ) : (
            <Table head={["No", "Tanggal Assesment", "Aksi"]}>
              {dataRiwayatAssesment?.map((item, i) => (
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
