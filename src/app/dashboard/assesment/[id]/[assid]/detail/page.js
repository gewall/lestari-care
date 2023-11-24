"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import Table from "@/components/table/Table";
import DashboardLayout from "@/layouts/dashboard";
import { getDataAssesment } from "@/lib/api/getDataAssesment";
import { getDataPasien } from "@/lib/api/getDataPasien";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Spacer,
  Spinner,
  Tag,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Detail = ({ params }) => {
  const [dataPengkajianUmum, setDataPengkajianUmum] = useState(null);
  const [dataLokalLuka, setDataLokalLuka] = useState(null);
  const [dataTTV, setDataTTV] = useState(null);
  const [dataLuka, setDataLuka] = useState(null);
  const [dataTujuanPerawatan, setDataTujuanPerawatan] = useState(null);
  const [dataPasien, setDataPasien] = useState(null);
  const [dataAssesment, setDataAssesment] = useState(null);

  useEffect(() => {
    const getDataPengkajianUmum = async () => {
      const req = await fetch(`/api/assesment/pengkajian-umum/${params.assid}`);
      const res = await req.json();

      if (req.ok) {
        setDataPengkajianUmum(res.result);
      }
    };

    const getDataLokalLuka = async () => {
      const req = await fetch(`/api/assesment/lokal-luka/${params.assid}`);
      const res = await req.json();

      if (req.ok) {
        setDataLokalLuka(res.result);
      }
    };

    const getDataTTV = async () => {
      const req = await fetch(`/api/assesment/ttv/${params.assid}`);
      const res = await req.json();

      if (req.ok) {
        setDataTTV(res.result);
      }
    };

    const getDataLuka = async () => {
      const req = await fetch(`/api/assesment/luka/${params.assid}`);
      const res = await req.json();

      if (req.ok) {
        setDataLuka(res.result);
      }
    };

    const getDataTujuanPerawatan = async () => {
      const req = await fetch(
        `/api/assesment/tujuan-perawatan/${params.assid}`
      );
      const res = await req.json();

      if (req.ok) {
        setDataTujuanPerawatan(res.result);
      }
    };

    const getPasien = async () => {
      const _dataPasien = await getDataPasien({ id: params.id });

      setDataPasien(_dataPasien);
    };

    const getAssesment = async () => {
      const _dataAssesment = await getDataAssesment({ id: params.assid });

      setDataAssesment(_dataAssesment);
    };

    getPasien();
    getAssesment();
    getDataPengkajianUmum();
    getDataLokalLuka();
    getDataTTV();
    getDataLuka();
    getDataTujuanPerawatan();
  }, [params.assid]);

  console.log(dataPengkajianUmum);
  return (
    <DashboardLayout>
      <Header title={"Detail"} />

      <ContentWrapper>
        <Box>
          {dataPasien === null && dataAssesment === null ? (
            <Center>
              <Text>Mohon Tunggu...</Text>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama Pasien</FormLabel>
                <Input type="text" value={dataPasien?.nama} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Usia</FormLabel>
                <Input type="text" value={dataPasien?.usia} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Id Assesment</FormLabel>
                <Input type="text" value={dataAssesment?.id} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Tanggal Assesment</FormLabel>
                <Input
                  type="text"
                  value={new Date(dataAssesment?.tanggal).toLocaleString(
                    "id-ID",
                    { timeZone: "Asia/Jakarta" }
                  )}
                  isReadOnly
                />
              </FormControl>
            </SimpleGrid>
          )}
        </Box>
        <Box>
          <Table head={["No", "Menu", "Status", "Aksi"]}>
            <Tr>
              <Td>1</Td>
              <Td>Pengkajian Umum</Td>
              <Td>
                {dataPengkajianUmum === null ? "Belum Diisi" : "Sudah Diisi"}
              </Td>
              <Td>
                {dataPengkajianUmum === null ? (
                  <Button
                    colorScheme={"twitter"}
                    size={"sm"}
                    as={Link}
                    href={`/dashboard/assesment/${params.id}/${params.assid}/pengkajian-umum/tambah`}
                  >
                    Isi
                  </Button>
                ) : (
                  <Button
                    colorScheme={"whatsapp"}
                    size={"sm"}
                    as={Link}
                    href={""}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Pengkajian Lokal Luka</Td>
              <Td>{dataLokalLuka === null ? "Belum Diisi" : "Sudah Diisi"}</Td>
              <Td>
                {dataLokalLuka === null ? (
                  <Button
                    colorScheme={"twitter"}
                    size={"sm"}
                    as={Link}
                    href={`/dashboard/assesment/${params.id}/${params.assid}/lokal-luka/tambah`}
                  >
                    Isi
                  </Button>
                ) : (
                  <Button
                    colorScheme={"whatsapp"}
                    size={"sm"}
                    as={Link}
                    href={""}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>TTV</Td>
              <Td>{dataTTV === null ? "Belum Diisi" : "Sudah Diisi"}</Td>
              <Td>
                {dataTTV === null ? (
                  <Button
                    colorScheme={"twitter"}
                    size={"sm"}
                    as={Link}
                    href={`/dashboard/assesment/${params.id}/${params.assid}/ttv/tambah`}
                  >
                    Isi
                  </Button>
                ) : (
                  <Button
                    colorScheme={"whatsapp"}
                    size={"sm"}
                    as={Link}
                    href={""}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>Luka</Td>
              <Td>{dataLuka === null ? "Belum Diisi" : "Sudah Diisi"}</Td>
              <Td>
                {dataLuka === null ? (
                  <Button
                    colorScheme={"twitter"}
                    size={"sm"}
                    as={Link}
                    href={`/dashboard/assesment/${params.id}/${params.assid}/luka/tambah`}
                  >
                    Isi
                  </Button>
                ) : (
                  <Button
                    colorScheme={"whatsapp"}
                    size={"sm"}
                    as={Link}
                    href={""}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td>Tujuan Perawatan</Td>
              <Td>
                {dataTujuanPerawatan === null ? "Belum Diisi" : "Sudah Diisi"}
              </Td>
              <Td>
                {dataTujuanPerawatan === null ? (
                  <Button
                    colorScheme={"twitter"}
                    size={"sm"}
                    as={Link}
                    href={`/dashboard/assesment/${params.id}/${params.assid}/tujuan-perawatan/tambah`}
                  >
                    Isi
                  </Button>
                ) : (
                  <Button
                    colorScheme={"whatsapp"}
                    size={"sm"}
                    as={Link}
                    href={""}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
          </Table>
        </Box>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default Detail;
