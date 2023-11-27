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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const Detail = ({ params }) => {
  const toast = useToast();
  const { data: session } = useSession();
  const [dataPengkajianUmum, setDataPengkajianUmum] = useState(null);
  const [dataLokalLuka, setDataLokalLuka] = useState(null);
  const [dataTTV, setDataTTV] = useState(null);
  const [dataLuka, setDataLuka] = useState(null);
  const [dataTujuanPerawatan, setDataTujuanPerawatan] = useState(null);
  const [dataPasien, setDataPasien] = useState(null);
  const [dataAssesment, setDataAssesment] = useState(null);
  const [loadingBiaya, setLoadingBiaya] = useState(false);
  const [isLunas, setIsLunas] = useState({ status: false, biaya: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    setLoadingBiaya(true);
    const req = await fetch(`/api/assesment/bayar/tambah`, {
      method: "POST",
      body: JSON.stringify({
        assesmentId: params.assid,
        biaya: e.biaya,
      }),
    });
    const res = await req.json();
    console.log(res);
    if (req.ok) {
      toast({
        title: "Pembayaran Berhasil.",
        description: "Pembayaran Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      if (res?.result !== null)
        setIsLunas({ status: true, biaya: res.result.biaya });
    } else {
      toast({
        title: "Pembayaran Gagal.",
        description: "Pembayaran Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoadingBiaya(false);
  };
  useEffect(() => {
    const getKeuangan = async () => {
      const req = await fetch(`/api/assesment/bayar/${params.assid}`);
      const res = await req.json();

      if (req.ok) {
        if (res?.result !== null)
          setIsLunas({ status: true, biaya: res.result.biaya });
      }
    };

    const getDataPengkajianUmum = async () => {
      const req = await fetch(`/api/assesment/pengkajian-umum/${params.assid}`);
      const res = await req.json();

      setDataPengkajianUmum(res);
    };

    const getDataLokalLuka = async () => {
      const req = await fetch(`/api/assesment/lokal-luka/${params.assid}`);
      const res = await req.json();

      setDataLokalLuka(res);
    };

    const getDataTTV = async () => {
      const req = await fetch(`/api/assesment/ttv/${params.assid}`);
      const res = await req.json();

      setDataTTV(res);
    };

    const getDataLuka = async () => {
      const req = await fetch(`/api/assesment/luka/${params.assid}`);
      const res = await req.json();

      setDataLuka(res);
    };

    const getDataTujuanPerawatan = async () => {
      const req = await fetch(
        `/api/assesment/tujuan-perawatan/${params.assid}`
      );
      const res = await req.json();

      setDataTujuanPerawatan(res);
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
    getKeuangan();
  }, [params.assid]);

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
              {session?.user.role === "ADMIN" && (
                <FormControl as={"form"} onSubmit={handleSubmit(onSubmit)}>
                  <FormLabel>Biaya</FormLabel>
                  {isLunas.status ? (
                    <Input
                      type="string"
                      value={
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(isLunas.biaya) + " (LUNAS)"
                      }
                      isReadOnly
                    />
                  ) : (
                    <Input
                      type="number"
                      placeholder="Masukkan Biaya"
                      {...register("biaya", { required: true })}
                    />
                  )}
                  {!isLunas.status && (
                    <Button
                      type={"submit"}
                      colorScheme={"whatsapp"}
                      mt={2}
                      isLoading={loadingBiaya}
                    >
                      Bayar
                    </Button>
                  )}
                </FormControl>
              )}
            </SimpleGrid>
          )}
        </Box>
        <Box>
          <Table head={["No", "Menu", "Status", "Aksi"]}>
            <Tr>
              <Td>1</Td>
              <Td>Pengkajian Umum</Td>
              <Td>
                {dataPengkajianUmum === null ? (
                  <Spinner color="green.300" />
                ) : dataPengkajianUmum.result === null ? (
                  "Belum Diisi"
                ) : (
                  "Sudah Diisi"
                )}
              </Td>
              <Td>
                {dataPengkajianUmum?.result === null ? (
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
                    href={`/dashboard/assesment/${params.id}/${params.assid}/pengkajian-umum/${dataLokalLuka?.result?.id}`}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Pengkajian Lokal Luka</Td>
              <Td>
                {" "}
                {dataLokalLuka === null ? (
                  <Spinner color="green.300" />
                ) : dataLokalLuka.result === null ? (
                  "Belum Diisi"
                ) : (
                  "Sudah Diisi"
                )}
              </Td>
              <Td>
                {dataLokalLuka?.result === null ? (
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
                    href={`/dashboard/assesment/${params.id}/${params.assid}/lokal-luka/${dataLokalLuka?.result?.id}`}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>TTV</Td>
              <Td>
                {" "}
                {dataTTV === null ? (
                  <Spinner color="green.300" />
                ) : dataTTV.result === null ? (
                  "Belum Diisi"
                ) : (
                  "Sudah Diisi"
                )}
              </Td>
              <Td>
                {dataTTV?.result === null ? (
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
                    href={`/dashboard/assesment/${params.id}/${params.assid}/ttv/${dataLokalLuka?.result?.id}`}
                  >
                    Lihat
                  </Button>
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>Luka</Td>
              <Td>
                {" "}
                {dataLuka === null ? (
                  <Spinner color="green.300" />
                ) : dataLuka.result === null ? (
                  "Belum Diisi"
                ) : (
                  "Sudah Diisi"
                )}
              </Td>
              <Td>
                {dataLuka?.result === null ? (
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
                    href={`/dashboard/assesment/${params.id}/${params.assid}/luka/${dataLokalLuka?.result?.id}`}
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
                {dataTujuanPerawatan === null ? (
                  <Spinner color="green.300" />
                ) : dataTujuanPerawatan.result === null ? (
                  "Belum Diisi"
                ) : (
                  "Sudah Diisi"
                )}
              </Td>
              <Td>
                {dataTujuanPerawatan?.result === null ? (
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
                    href={`/dashboard/assesment/${params.id}/${params.assid}/tujuan-perawatan/${dataLokalLuka?.result?.id}`}
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
