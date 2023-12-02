"use client";

import {
  Box,
  Container,
  Flex,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SuratRujukan = () => {
  const searchParams = useSearchParams();
  const di = searchParams.get("di");
  const ts = searchParams.get("ts");
  const tanggal = searchParams.get("tanggal");
  const alamat = searchParams.get("alamat");
  const namapas = searchParams.get("namapas");
  const usia = searchParams.get("usia");
  const diagnosa = searchParams.get("diagnosa");
  const hasilPemeriksaan = searchParams.get("hasilpemeriksaan");
  //   useEffect(() => {
  //     window.print();
  //   }, []);
  return (
    <Container>
      <Text>Kepada yth.</Text>
      <Text>Ts.{ts}</Text>
      <Text>Di {di}</Text>
      <Box my={8} />
      <Text>
        Bersama ini saya sempatkan permohonan pemeriksaan / perawatan / tindakan
        lanjutan terhadap pasien:
      </Text>
      <Table variant={"unstyled"}>
        <Tbody>
          <Tr>
            <Td w={32} p={2} pl={0}>
              Nama Pasien
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {namapas}
            </Td>
          </Tr>
          <Tr>
            <Td w={32} p={2} pl={0}>
              Umur Pasien
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {usia}
            </Td>
          </Tr>
          <Tr>
            <Td w={32} p={2} pl={0}>
              Alamat
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {alamat}
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Text>
        Hasil pemeriksaan sementara terhadapt pasien tersebut sebagai berikut:{" "}
        {hasilPemeriksaan}
      </Text>
      <Table variant={"unstyled"}>
        <Tbody>
          <Tr>
            <Td w={32} p={2} pl={0}>
              Diagnosa
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {diagnosa}
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <Box my={4} />

      <Flex justifyContent={"flex-start"}>
        <Flex flexDir={"column"} h={40} alignItems={"center"}>
          <Text>{new Date(tanggal).toISOString().slice(0, 10)}</Text>
          <Spacer />
          <Text>Pengirim</Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SuratRujukan;
