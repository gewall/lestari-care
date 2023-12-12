"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import Table from "@/components/table/Table";
import DashboardLayout from "@/layouts/dashboard";
import { Link } from "@chakra-ui/next-js";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spacer,
  Spinner,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Td,
  Text,
  Textarea,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// export async function generateStaticParams() {
//   const req = await fetch("/api/pasien");
//   const res = await req.json();

//   return res.map((_res) => ({
//     id: _res.id,
//   }));
// }

const Detail = ({ params }) => {
  const router = useRouter();
  const toast = useToast();
  const [dataKaryawan, setDataKaryawan] = useState(null);
  const [dataRiwayatAssesment, setDataRiwayatAssesment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingHomecare, setLoadingHomecare] = useState(false);
  const [loadingHomevisit, setLoadingHomevisit] = useState(false);
  const [selectedDates, setSelectedDates] = useState([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(),
  ]);
  const [selectedDates1, setSelectedDates1] = useState([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(),
  ]);
  const [dataHomecare, setDataHomecare] = useState({ result: [] });
  const [dataHomevisit, setDataHomevisit] = useState({ result: [] });
  const [gajiVal, setGajiVal] = useState(0);
  const [loadingGaji, setLoadingGaji] = useState(false);
  const [isGajian, setIsGajian] = useState(false);
  const {
    isOpen: isOpenHomecare,
    onOpen: onOpenHomecare,
    onClose: onCloseHomecare,
  } = useDisclosure();

  const {
    isOpen: isOpenHomevisit,
    onOpen: onOpenHomevisit,
    onClose: onCloseHomevisit,
  } = useDisclosure();

  const {
    register: registerHomecare,
    handleSubmit: handleSubmitHomecare,
    formState: { errors: errorsHomecare },
  } = useForm();

  const {
    register: registerHomevisit,
    handleSubmit: handleSubmitHomevisit,
    formState: { errors: errorsHomevisit },
  } = useForm();

  useEffect(() => {
    const getDataKaryawan = async () => {
      const req = await fetch(`/api/karyawan/${params.id}`);
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setDataKaryawan(res);
    };

    const getGaji = async () => {
      const req = await fetch(`/api/karyawan/gaji?userId=${params.id}`);
      const res = await req.json();

      if (!req.ok) {
        return;
      }

      setIsGajian(res?.isGajian);
    };

    // const getDataHomecare = async () => {
    //   const req = await fetch(
    //     `/api/karyawan/intensif/homecare?userId=${params.id}&&fromDate=${selectedDates[0]}&&toDate=${selectedDates[1]}`
    //   );
    //   const res = await req.json();
    //   console.log(res, "hc");
    //   if (!req.ok) {
    //     return;
    //   }

    //   setDataHomecare(res);
    // };

    //   const getRiwayatAsessment = async () => {
    //     const req = await fetch(`/api/assesment`, {
    //       method: "POST",
    //       body: JSON.stringify({ id: params.id }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const res = await req.json();

    //     if (!req.ok) {
    //       return;
    //     }

    //     setDataRiwayatAssesment(res);
    //   };

    //   getRiwayatAsessment();
    getDataKaryawan();
    getGaji();
    // getDataHomecare();
  }, [params.id]);

  const onSubmitHomecare = async (e) => {
    setLoadingHomecare(true);
    const data = { ...e, tanggal: new Date(e.tanggal), userId: params.id };

    const req = await fetch("/api/karyawan/intensif/homecare/tambah", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (req.ok) {
      toast({
        title: "Berhasil Menambah Data.",
        description: "Data Homecare Berhasil Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Gagal Menambah Data.",
        description: "Data Homecare Gagal Ditambahkan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoadingHomecare(false);
  };

  const onSubmitHomevisit = async (e) => {
    setLoadingHomevisit(true);
    const data = { ...e, tanggal: new Date(e.tanggal), userId: params.id };

    const req = await fetch("/api/karyawan/intensif/homevisit/tambah", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (req.ok) {
      toast({
        title: "Berhasil Menambah Data.",
        description: "Data Homevisit Berhasil Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Gagal Menambah Data.",
        description: "Data Homevisit Gagal Ditambahkan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoadingHomevisit(false);
  };

  const onFilterHomecare = async () => {
    const req = await fetch(
      `/api/karyawan/intensif/homecare?userId=${params.id}&&fromDate=${selectedDates[0]}&&toDate=${selectedDates[1]}`
    );
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setDataHomecare(res);
  };

  const onFilterHomevisit = async () => {
    const req = await fetch(
      `/api/karyawan/intensif/homevisit?userId=${params.id}&&fromDate=${selectedDates1[0]}&&toDate=${selectedDates1[1]}`
    );
    const res = await req.json();

    if (!req.ok) {
      return;
    }

    setDataHomevisit(res);
  };

  const onSubmitGaji = async (e) => {
    e.preventDefault();

    setLoadingGaji(true);
    const data = {
      userId: params.id,
      nominal:
        parseInt(gajiVal) +
        dataHomecare?.result?.length * 60000 +
        dataHomevisit?.result?.length * 40000,
    };

    const req = await fetch("/api/karyawan/gaji/tambah", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (req.ok) {
      toast({
        title: "Berhasil Menambah Data.",
        description: "Data Gaji Berhasil Ditambahkan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsGajian(true);
    } else {
      toast({
        title: "Gagal Menambah Data.",
        description: "Data Gaji Gagal Ditambahkan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoadingGaji(false);
  };

  //   console.log(dataHomevisit, "Pas");

  return (
    <DashboardLayout>
      <Header title={"Detail Karyawan"} />

      <Modal isOpen={isOpenHomecare} onClose={onCloseHomecare}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmitHomecare(onSubmitHomecare)}
        >
          <ModalHeader>Tambah Karyawan Homecare</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  value={dataKaryawan?.result.name}
                  //   placeholder="Masukkan Nama Karyawan"
                  //   {...registerHomecare("name", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Deskripsi</FormLabel>
                <Textarea
                  type="email"
                  placeholder="Masukkan Deskripsi Tambahan"
                  {...registerHomecare("deskripsi", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Tanggal</FormLabel>
                <Input
                  type="date"
                  placeholder="Masukkan Tanggal Homecare"
                  {...registerHomecare("tanggal", { required: true })}
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
              isLoading={loadingHomecare}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenHomevisit} onClose={onCloseHomevisit}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={handleSubmitHomevisit(onSubmitHomevisit)}
        >
          <ModalHeader>Tambah Karyawan Homevisit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  value={dataKaryawan?.result.name}
                  //   placeholder="Masukkan Nama Karyawan"
                  //   {...registerHomecare("name", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Deskripsi</FormLabel>
                <Textarea
                  type="email"
                  placeholder="Masukkan Deskripsi Tambahan"
                  {...registerHomevisit("deskripsi", { required: true })}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl>
                <FormLabel>Tanggal</FormLabel>
                <Input
                  type="date"
                  placeholder="Masukkan Tanggal Homecare"
                  {...registerHomevisit("tanggal", { required: true })}
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
              isLoading={loadingHomevisit}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ContentWrapper>
        {dataKaryawan === null ? (
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
                value={dataKaryawan?.result?.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                isReadOnly
                type="text"
                // placeholder="Masukkan No.Ktp Pasien"
                value={dataKaryawan?.result?.email}
              />
            </FormControl>
          </SimpleGrid>
        )}
        <Card my={4}>
          <StatGroup m={4}>
            {dataHomecare === null ? (
              <Spinner color={"green.300"} />
            ) : (
              <Fragment>
                <Stat>
                  <StatLabel>Homecare</StatLabel>
                  <StatNumber>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(dataHomecare?.result?.length * 60000)}
                  </StatNumber>
                  <StatHelpText>{dataHomecare?.result?.length}x</StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Homevisit</StatLabel>
                  <StatNumber>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(dataHomevisit?.result?.length * 40000)}
                  </StatNumber>
                  <StatHelpText>{dataHomevisit?.result?.length}x</StatHelpText>
                </Stat>
              </Fragment>
            )}
          </StatGroup>
        </Card>
        {isGajian ? (
          <Alert status="success" variant={"left-accent"} mb={2}>
            <AlertIcon />
            Bulan Ini Sudah Gajian
          </Alert>
        ) : (
          <Fragment>
            <Alert status="warning" variant={"left-accent"} mb={2}>
              <AlertIcon />
              Insentif Dari Homecare dan Homevisit Akan Ditambahkan Kedalam
              Gaji.
            </Alert>

            <Box as={"form"}>
              <SimpleGrid>
                <FormControl>
                  <FormLabel>Gaji</FormLabel>
                  <Input
                    type="number"
                    defaultValue={0}
                    placeholder="Masukkan Gaji Karyawan"
                    onChange={(e) => setGajiVal(e.target.value)}
                  />
                  <Alert status="warning" variant={"left-accent"} my={2}>
                    {`(${dataHomecare?.result?.length * 60000} + ${
                      dataHomevisit?.result?.length * 40000
                    }) + ${gajiVal} = ${new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(
                      dataHomecare?.result?.length * 60000 +
                        dataHomevisit?.result?.length * 40000 +
                        parseInt(gajiVal)
                    )}`}
                  </Alert>
                </FormControl>
              </SimpleGrid>
              <Box w={"full"}>
                <Button
                  colorScheme={"whatsapp"}
                  type={"submit"}
                  w={{ base: "full", md: "auto" }}
                  onClick={onSubmitGaji}
                  isLoading={loadingGaji}
                >
                  Bayar Gaji
                </Button>
              </Box>
            </Box>
          </Fragment>
        )}
        <Box>
          <Flex my={2} flexDir={{ base: "column", md: "row" }}>
            <Heading as={"h5"} size={"md"}>
              Riwayat Homecare
            </Heading>
            <Spacer />

            <Button
              my={{ base: 2, md: 0 }}
              onClick={onOpenHomecare}
              colorScheme={"twitter"}
              size={"sm"}
              isLoading={loading}
            >
              Tambah Homecare
            </Button>
          </Flex>
          <Flex
            alignItems={{ base: "flex-start", md: "center" }}
            flexDir={{ base: "column", md: "row" }}
            w={{ base: "full", md: "80" }}
          >
            <RangeDatepicker
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
            />
            <Box mx={{ md: 2 }} my={{ base: 2 }} />
            <Button colorScheme={"twitter"} onClick={onFilterHomecare}>
              Filter
            </Button>
          </Flex>
          <Box>
            {dataHomecare?.result?.length === 0 ? (
              <Center my={4}>
                <Text>Tidak Ditemukan, Silahkan Lakukan Pemilihan Tanggal</Text>
              </Center>
            ) : (
              <Table head={["No", "Tanggal", "Deskripsi", "Aksi"]}>
                {dataHomecare?.result?.map((item, i) => (
                  <Tr key={item.id}>
                    <Td>{i + 1}</Td>
                    <Td>{item.tanggal.slice(0, 10)}</Td>
                    <Td>{item.deskripsi}</Td>

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
        </Box>

        <Box>
          <Flex my={2} flexDir={{ base: "column", md: "row" }}>
            <Heading as={"h5"} size={"md"}>
              Riwayat Homevisit
            </Heading>
            <Spacer />

            <Button
              my={{ base: 2, md: 0 }}
              onClick={onOpenHomevisit}
              colorScheme={"twitter"}
              size={"sm"}
            >
              Tambah Homevisit
            </Button>
          </Flex>
          <Flex
            alignItems={{ base: "flex-start", md: "center" }}
            flexDir={{ base: "column", md: "row" }}
            w={{ base: "full", md: "80" }}
          >
            <RangeDatepicker
              selectedDates={selectedDates1}
              onDateChange={setSelectedDates1}
            />
            <Box mx={{ md: 2 }} my={{ base: 2 }} />
            <Button colorScheme={"twitter"} onClick={onFilterHomevisit}>
              Filter
            </Button>
          </Flex>
          <Box>
            {dataHomevisit?.result?.length === 0 ? (
              <Center my={4}>
                <Text>Tidak Ditemukan, Silahkan Lakukan Pemilihan Tanggal</Text>
              </Center>
            ) : (
              <Table head={["No", "Tanggal", "Deskripsi", "Aksi"]}>
                {dataHomevisit?.result?.map((item, i) => (
                  <Tr key={item.id}>
                    <Td>{i + 1}</Td>
                    <Td>{item.tanggal.slice(0, 10)}</Td>
                    <Td>{item.deskripsi}</Td>

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
        </Box>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default Detail;
