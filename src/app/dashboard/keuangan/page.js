"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
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
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Td,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useForm } from "react-hook-form";
import Table from "@/components/table/Table";
import Paging from "@/components/dashboard/Paging";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Keuangan = () => {
  const toast = useToast();
  const [tes, setTes] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "Gaji",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });
  const [selectedDatesInsentif, setSelectedDatesInsentif] = useState([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(),
  ]);
  const [selectedDatesAssesment, setSelectedDatesAssesment] = useState([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(),
  ]);

  const [insentifChart, setInsentifChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Gaji",
        data: [],
      },
    ],
  });
  const [insentif, setInsentif] = useState(null);
  const [assesmentChart, setAssesmentChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Biaya",
        data: [],
      },
    ],
  });
  const [assesment, setAssesment] = useState(null);
  const [stok, setStok] = useState(null);
  const [loadingLunas, setLoadingLunas] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loadingTambah, setLoadingTambah] = useState(false);
  const [piutang, setPiutang] = useState(null);

  useEffect(() => {
    const getInsentif = async () => {
      const req = await fetch(
        `/api/keuangan/insentif?fromDate=${selectedDatesInsentif[0]}&&toDate=${selectedDatesInsentif[1]}`
      );
      const res = await req.json();

      if (!req.ok) return;

      const nominal = res.result?.map((item) => item.nominal);
      const tanggal = res.result?.map((item) =>
        new Date(item.tanggal).toLocaleDateString("id-ID")
      );

      setInsentif(res.result);
      setInsentifChart({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: tanggal,
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(value);
              },
            },
          },
        },
        series: [
          {
            name: "Gaji",
            data: nominal,
          },
        ],
      });
    };

    const getAssesment = async () => {
      const req = await fetch(
        `/api/keuangan/assesment?fromDate=${selectedDatesAssesment[0]}&&toDate=${selectedDatesAssesment[1]}`
      );
      const res = await req.json();

      if (!req.ok) return;

      const nominal = res.result?.map((item) => item.biaya);
      const tanggal = res.result?.map((item) =>
        new Date(item.tanggalBayar).toLocaleDateString("id-ID")
      );

      setAssesment(res.result);
      setAssesmentChart({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: tanggal,
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(value);
              },
            },
          },
        },
        series: [
          {
            name: "Biaya",
            data: nominal,
          },
        ],
      });
    };

    const getStok = async () => {
      const req = await fetch(`/api/keuangan/stok/masuk`);
      const res = await req.json();

      if (!req.ok) return;

      const nominalBhpMasuk = res.result?.bhp
        ?.filter(
          (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
        )
        .filter((item) => item.tipe === "KELUAR")
        .reduce((a, b) => a + b.nominal, 0);

      const nominalAlkesMasuk = res.result?.alkes
        ?.filter(
          (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
        )
        .filter((item) => item.tipe === "KELUAR")
        .reduce((a, b) => a + b.nominal, 0);

      const nominalBhpKeluar = res.result?.bhp
        ?.filter(
          (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
        )
        .filter((item) => item.tipe === "MASUK")
        .reduce((a, b) => a + b.nominal, 0);

      const nominalAlkesKeluar = res.result?.alkes
        ?.filter(
          (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
        )
        .filter((item) => item.tipe === "MASUK")
        .reduce((a, b) => a + b.nominal, 0);

      console.log(res);

      setStok({
        bhp: { masuk: nominalBhpMasuk, keluar: nominalBhpKeluar },
        alkes: { masuk: nominalAlkesMasuk, keluar: nominalAlkesKeluar },
      });
    };

    const getPiutang = async () => {
      const req = await fetch(`/api/keuangan/piutang`);
      const res = await req.json();

      if (!req.ok) return;

      setPiutang(res);
    };

    getStok();
    getPiutang();

    getInsentif();
    getAssesment();
  }, []);

  const filterInsentif = async () => {
    const req = await fetch(
      `/api/keuangan/insentif?fromDate=${selectedDatesInsentif[0]}&&toDate=${selectedDatesInsentif[1]}`
    );
    const res = await req.json();

    if (!req.ok) return;

    const nominal = res.result?.map((item) => item.nominal);
    const tanggal = res.result?.map((item) =>
      new Date(item.tanggal).toLocaleDateString("id-ID")
    );

    setInsentifChart({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: tanggal,
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(value);
            },
          },
        },
      },
      series: [
        {
          name: "Gaji",
          data: nominal,
        },
      ],
    });
  };

  const filterAssesment = async () => {
    const req = await fetch(
      `/api/keuangan/assesment?fromDate=${selectedDatesAssesment[0]}&&toDate=${selectedDatesAssesment[1]}`
    );
    const res = await req.json();

    if (!req.ok) return;

    const nominal = res.result?.map((item) => item.biaya);
    const tanggal = res.result?.map((item) =>
      new Date(item.tanggalBayar).toLocaleDateString("id-ID")
    );

    setAssesment(res.result);
    setAssesmentChart({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: tanggal,
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(value);
            },
          },
        },
      },
      series: [
        {
          name: "Biaya",
          data: nominal,
        },
      ],
    });
  };

  // const perbandinganInsentif = () => {
  //   if (
  //     insentif
  //       ?.filter(
  //         (item) =>
  //           new Date(item.tanggal).getMonth() === new Date().getMonth() - 1
  //       )
  //       .reduce((a, b) => {
  //         return a + b.nominal;
  //       }, 0) === 0
  //   )
  //     return insentif
  //       ?.filter(
  //         (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
  //       )
  //       .reduce((a, b) => a + b.nominal, 0);

  //   return (
  //     insentif
  //       ?.filter(
  //         (item) =>
  //           new Date(item.tanggal).getMonth() === new Date().getMonth() - 1
  //       )
  //       .reduce((a, b) => {
  //         return a + b.nominal;
  //       }, 0) -
  //     (insentif
  //       ?.filter(
  //         (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
  //       )
  //       .reduce((a, b) => a + b.nominal, 0) /
  //       insentif
  //         ?.filter(
  //           (item) =>
  //             new Date(item.tanggal).getMonth() === new Date().getMonth() - 1
  //         )
  //         .reduce((a, b) => {
  //           return a + b.nominal;
  //         }, 0)) *
  //       100
  //   );
  // };

  console.log(stok, "stok");

  const onSubmit = async (e) => {
    setLoadingTambah(true);

    const req = await fetch("/api/keuangan/piutang/tambah", {
      method: "POST",
      body: JSON.stringify(e),
    });

    const res = await req.json();

    if (req.ok) {
      toast({
        title: "Berhasil Menyimpan Data.",
        description: "Data Piutang Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // perbaruiData();
    } else {
      toast({
        title: "Gagal Menyimpan Data.",
        description: "Data Piutang Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoadingTambah(false);
  };

  const refreshPiutang = async () => {
    const req = await fetch(`/api/keuangan/piutang`);
    const res = await req.json();

    if (!req.ok) return;

    setPiutang(res);
  };
  return (
    <DashboardLayout>
      <Header title={"Laporan Keuangan"} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Tambah Piutang</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama Perusahaan</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan Nama Perusahaan"
                  {...register("namaPerusahaan", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Jenis Produk</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan Jenis Produk"
                  {...register("jenisProduk", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Jumlah</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukkan Jumlah"
                  {...register("jumlah", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>No. Faktur</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukkan No. Faktur"
                  {...register("noFaktur", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Total</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukkan Total"
                  {...register("total", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
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
        <Stack flexDir={{ base: "column", md: "row" }} spacing={8}>
          <Stack space={4}>
            <Heading as={"h3"} size={"md"}>
              Stok BHP
            </Heading>
            <Stack flexDir={{ base: "column", md: "row" }} spacing={4}>
              <Stat
                bgGradient="linear(to-r, green.300, yellow.400)"
                rounded="md"
                p={4}
                color={"white"}
              >
                <StatLabel>Pemasukan</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(stok?.bhp?.masuk)}
                </StatNumber>
              </Stat>

              <Stat
                bgGradient="linear(to-r, green.300, yellow.400)"
                rounded="md"
                p={4}
                color={"white"}
              >
                <StatLabel>Pengeluaran</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(stok?.bhp?.keluar)}
                </StatNumber>
              </Stat>
            </Stack>
          </Stack>
          <Stack space={4}>
            <Heading as={"h3"} size={"md"}>
              Stok Alkes
            </Heading>
            <Stack spacing={4} flexDir={{ base: "column", md: "row" }}>
              <Stat
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                rounded="md"
                p={4}
                color={"white"}
              >
                <StatLabel>Pemasukan</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(stok?.alkes?.masuk)}
                </StatNumber>
              </Stat>

              <Stat
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                rounded="md"
                p={4}
                color={"white"}
              >
                <StatLabel>Pengeluaran</StatLabel>
                <StatNumber>
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(stok?.alkes?.keluar)}
                </StatNumber>
              </Stat>
            </Stack>
          </Stack>
        </Stack>

        <Stack flexDir={{ base: "column", md: "row" }}>
          <Stack my={4} spacing={4} flex={1}>
            <Box>
              <Heading as={"h3"} size={"md"}>
                Pengeluaran Insentif Karyawan
              </Heading>
            </Box>
            <StatGroup
              bgGradient="linear(to-r, blue.300, purple.100)"
              rounded="md"
              p={4}
              color={"white"}
            >
              <Stat>
                <StatLabel>Pengeluaran</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(insentif?.reduce((a, b) => a + b.nominal, 0))}
                </StatNumber>
              </Stat>
            </StatGroup>

            <Stack>
              <RangeDatepicker
                configs={{
                  dateFormat: "dd/MM/yyyy",
                }}
                selectedDates={selectedDatesInsentif}
                onDateChange={setSelectedDatesInsentif}
              />
              <Button onClick={filterInsentif}>Filter</Button>
            </Stack>
            <Box overflow={"auto"} w={{ md: "100%" }}>
              <Chart
                options={insentifChart.options}
                series={insentifChart.series}
                type="line"
                width="100%"
              />
            </Box>
          </Stack>

          <Stack my={4} spacing={4} flex={1}>
            <Box>
              <Heading as={"h3"} size={"md"}>
                Pemasukan Tarif Assesment
              </Heading>
            </Box>
            <StatGroup
              bgGradient="linear(to-r, purple.300, red.100)"
              rounded="md"
              p={4}
              color={"white"}
            >
              <Stat>
                <StatLabel>Pemasukan</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(assesment?.reduce((a, b) => a + b.biaya, 0))}
                </StatNumber>
              </Stat>
            </StatGroup>
            <Stack>
              <RangeDatepicker
                configs={{
                  dateFormat: "dd/MM/yyyy",
                }}
                selectedDates={selectedDatesAssesment}
                onDateChange={setSelectedDatesAssesment}
              />
              <Button onClick={filterAssesment}>Filter</Button>
            </Stack>
            <Box overflow={"auto"} w={{ md: "100%" }}>
              <Chart
                options={assesmentChart.options}
                series={assesmentChart.series}
                type="line"
                width="100%"
              />
            </Box>
          </Stack>
        </Stack>
        <Flex alignItems={"center"}>
          <Heading as={"h3"} size={"md"}>
            Piutang
          </Heading>
          <Spacer />

          <Button colorScheme={"twitter"} onClick={onOpen}>
            Tambah Piutang
          </Button>
        </Flex>
        <Stack
          flexDir={{ base: "column", md: "row" }}
          spacing={8}
          w={"full"}
          my={4}
        >
          <Stack spacing={4} flexDir={{ base: "column", md: "column" }}>
            <Stat
              bgGradient="linear(to-l,pink.200, red.300)"
              rounded="md"
              p={4}
              color={"white"}
            >
              <StatLabel>Keseluruhan</StatLabel>
              <StatNumber>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(piutang?.result?.reduce((a, b) => a + b.total, 0))}
              </StatNumber>
              <StatHelpText>{piutang?.result?.length} Piutang</StatHelpText>
            </Stat>

            <Stat
              bgGradient="linear(to-l,pink.200, red.300)"
              rounded="md"
              p={4}
              color={"white"}
            >
              <StatLabel>Belum Lunas</StatLabel>
              <StatNumber>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  piutang?.result
                    ?.filter((i) => i.status === "BELUM LUNAS")
                    .reduce((a, b) => a + b.total, 0)
                )}
              </StatNumber>
              <StatHelpText>
                {
                  piutang?.result?.filter((i) => i.status === "BELUM LUNAS")
                    .length
                }{" "}
                Piutang
              </StatHelpText>
            </Stat>
          </Stack>
          <Stack>
            <Paging api={"/api/keuangan/piutang"} setData={setPiutang} />
            <Table
              head={[
                "No",
                "Nama Perusahaan",

                "No. Faktur",
                "Total",
                "Status",
                "Aksi",
              ]}
            >
              {piutang?.result?.length === 0 ? (
                <Alert status="error">
                  <AlertIcon />
                  Data Tidak Ada!
                </Alert>
              ) : (
                piutang?.result?.map((item, i) => (
                  <Tr key={i}>
                    <Td w={0}>{i + 1}</Td>
                    <Td>{item.namaPerusahaan}</Td>

                    <Td>{item.noFaktur}</Td>
                    <Td>
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.total)}
                    </Td>
                    <Td>{item.status.slice(0, 5)}</Td>
                    <Td>
                      {item.status === "BELUM LUNAS" && (
                        <Button
                          onClick={async () => {
                            setLoadingLunas(true);
                            const req = await fetch(
                              `/api/keuangan/piutang/lunas`,
                              {
                                method: "PUT",
                                body: JSON.stringify({ id: item.id }),
                              }
                            );

                            if (req.ok) {
                              toast({
                                title: "Berhasil Menyimpan Data.",
                                description: "Data Piutang Berhasil Disimpan.",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                              });
                              // perbaruiData();
                              refreshPiutang();
                            } else {
                              toast({
                                title: "Gagal Menyimpan Data.",
                                description: "Data Piutang Gagal Disimpan.",
                                status: "error",
                                duration: 9000,
                                isClosable: true,
                              });
                            }

                            setLoadingLunas(false);
                          }}
                          colorScheme={"whatsapp"}
                          size={"sm"}
                          isLoading={loadingLunas}
                        >
                          Lunas
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))
              )}
            </Table>
          </Stack>
        </Stack>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default Keuangan;
