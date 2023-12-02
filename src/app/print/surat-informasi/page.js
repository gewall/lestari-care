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

const SuratInformasi = () => {
  const searchParams = useSearchParams();
  const nama = searchParams.get("nama");
  const ktp = searchParams.get("ktp");
  const tempat = searchParams.get("tempat");
  const tanggalLahir = searchParams.get("tanggalLahir");
  const alamat = searchParams.get("alamat");
  const hp = searchParams.get("hp");
  const namapas = searchParams.get("namapas");
  const usia = searchParams.get("usia");
  const diagnosa = searchParams.get("diagnosa");
  const tindakan = searchParams.get("tindakan");
  useEffect(() => {
    window.print();
  }, []);
  return (
    <Container>
      <Text>Saya yang bertanda tangan dibawah ini.</Text>
      <Table variant={"unstyled"}>
        <Tbody>
          <Tr>
            <Td w={32} p={2} pl={0}>
              Nama
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {nama}
            </Td>
          </Tr>
          <Tr>
            <Td w={32} p={2} pl={0}>
              No. KTP
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {ktp}
            </Td>
          </Tr>
          <Tr>
            <Td w={32} p={2} pl={0}>
              Tempat, Tanggal Lahir
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {tempat +
                ", " +
                new Date(tanggalLahir).toISOString().slice(0, 10)}
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
          <Tr>
            <Td w={32} p={2} pl={0}>
              No. HP
            </Td>
            <Td w={0} p={2} pl={0}>
              :
            </Td>
            <Td p={2} pl={0}>
              {hp}
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Text>Bertindak sebagai Wakil/wali pasien.</Text>
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
              Usia
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
      <Text>
        Menyatakan setuju untuk melakukan tindakan <b>{tindakan}</b> atas pasien
        tersebut diatas dengan telah diinformasikannya terlebih dahulu tentang
        kondisi pasien tersebut dan saya mengerti serta memahami konsekuensi
        dari tindakan tersebut, sesuai dengan penjelasan yang telah diberikan
        tenaga Kesehatan yang melakukan perawatannya.
      </Text>
      <Text>
        Demikian surat ini saya buat dengan penuh kesadaran dan tanpa tekanan
        dari pihak manapun
      </Text>
      <Box my={4} />
      <Flex>
        <Flex flexDir={"column"}>
          <Flex flexDir={"column"} h={40} alignItems={"center"}>
            <Text>Yang membuat pernyataan</Text>
            <Spacer />
            <Text>(.................................)</Text>
          </Flex>
          <Box my={4} />

          <Flex flexDir={"column"} h={40} alignItems={"center"}>
            <Text>Saksi - Saksi</Text>
            <Spacer />
            <Text>(.................................)</Text>
          </Flex>
        </Flex>
        <Spacer />
        <Flex flexDir={"column"}>
          <Flex>
            <Flex flexDir={"column"} h={40} alignItems={"center"}>
              <Text>Yang memberikan penjelasan</Text>
              <Spacer />
              <Text>(.................................)</Text>
            </Flex>
          </Flex>
          <Box my={4} />

          <Flex flexDir={"column"} h={40} alignItems={"center"}>
            <Text></Text>
            <Spacer />
            <Text>(.................................)</Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SuratInformasi;
