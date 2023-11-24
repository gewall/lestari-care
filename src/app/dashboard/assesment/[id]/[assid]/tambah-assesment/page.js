"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import toBase64 from "@/lib/base64Convert";
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Spinner,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDown, AiOutlineMinus } from "react-icons/ai";

const TambahAssesment = ({ params }) => {
  const toast = useToast();
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [isDone, setIsDone] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [tanggalKunjungan, setTanggalKunjungan] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerLokalLuka,
    handleSubmit: handleSubmitLokalLuka,
    formState: { errors: errorsLokalLuka },
  } = useForm();

  const {
    register: registerTTV,
    handleSubmit: handleSubmitTTV,
    formState: { errors: errorsTTV },
  } = useForm();

  const onSubmitPengkajianUmum = async (e) => {
    const data = { ...e, assesmentId: params.assid };
    setLoading1(true);
    const req = await fetch("/api/assesment/pengkajian-umum/tambah", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.ok) {
      toast({
        title: "Berhasil Menyimpan Data.",
        description: "Data Assesment Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setStepOne(false);
    } else {
      toast({
        title: "Gagal Menyimpan Data.",
        description: "Data Assesment Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading1(false);
  };

  const onSubmitLokalLuka = async (e) => {
    const foto = new FormData();
    setLoading2(true);
    const imgStr = await toBase64(e.foto[0]);

    const data = {
      ...e,
      assesmentId: params.assid,
      foto: imgStr,
      tanggalKunjungan,
    };

    const req = await fetch("/api/assesment/lokal-luka/tambah", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (req.ok) {
      toast({
        title: "Berhasil Menyimpan Data.",
        description: "Data Assesment Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setStepOne(false);
    } else {
      toast({
        title: "Gagal Menyimpan Data.",
        description: "Data Assesment Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading2(false);
  };

  const onSubmitTTV = async (e) => {
    const data = { ...e, assesmentId: params.assid };
    setLoading3(true);
    const req = await fetch("/api/assesment/ttv/tambah", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (req.ok) {
      toast({
        title: "Berhasil Menyimpan Data.",
        description: "Data Assesment Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setStepOne(false);
    } else {
      toast({
        title: "Gagal Menyimpan Data.",
        description: "Data Assesment Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading3(false);
  };

  useEffect(() => {
    const checkPengkajianUmum = async () => {
      const req = await fetch(`/api/assesment/pengkajian-umum/${params.assid}`);
      const res = await req.json();

      if (req.ok) {
        setIsDone((done) => ({ ...done, 1: res.result ? true : false }));
      }
    };

    const checkLokalLuka = async () => {
      const req = await fetch(`/api/assesment/lokal-luka/${params.assid}`);
      const res = await req.json();

      if (req.ok) {
        setIsDone((done) => ({ ...done, 2: res.result ? true : false }));
      }
    };

    checkLokalLuka();

    checkPengkajianUmum();
  }, []);

  console.log(isDone);
  return (
    <DashboardLayout>
      <Header title={"Tambah Assesment"} />

      <ContentWrapper>
        <Box>
          <Flex
            w={"full"}
            cursor={"pointer"}
            onClick={() => setStepOne(!stepOne)}
          >
            <Heading as={"h5"} size={"md"}>
              Pengkajian Umum
            </Heading>
            {isDone[1] && (
              <Tag size={"sm"} variant="solid" colorScheme="whatsapp" mx={2}>
                Sudah Diisi
              </Tag>
            )}
            <Spacer />
            {stepOne ? (
              <Icon as={AiOutlineMinus} />
            ) : (
              <Icon as={AiOutlineDown} />
            )}
          </Flex>
          <Collapse in={stepOne} animateOpacity>
            {isDone[1] ? (
              <Center my={4}>Data sudah diisi.</Center>
            ) : (
              <Box as="form" onSubmit={handleSubmit(onSubmitPengkajianUmum)}>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={4}
                  mx={2}
                  my={4}
                >
                  <FormControl>
                    <FormLabel>
                      Riwayat kejadian luka dan perawatan sebelumnya
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan riwayat Kejadian Luka"
                      {...register("riwayatKejadianLuka", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Faktor penyulit penyembuhan luka</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan faktor penyulit penyembuhan"
                      {...register("faktorPenyulitPenyembuhan", {
                        required: true,
                      })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status nutrisi</FormLabel>
                    <Select
                      defaultValue={"Baik"}
                      {...register("statusNutrisi", { required: true })}
                    >
                      <option value={"Baik"}>Baik</option>
                      <option value={"Malnutrisi"}>Malnutrisi</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Penyakit penyerta</FormLabel>
                    <Select
                      defaultValue={"DM"}
                      {...register("penyakitPenyerta", { required: true })}
                    >
                      <option value={"DM"}>DM</option>
                      <option value={"Gangguan Vaskular"}>
                        Gangguan Vaskular
                      </option>
                      <option value={"Infeksi"}>Infeksi</option>
                      <option value={"Hipertensi"}>Hipertensi</option>
                      <option value={"Lainnya"}>Lainnya</option>
                    </Select>
                    <Box my={2} />
                    <Input
                      type="text"
                      placeholder="Masukkan (-) jika tidak ada tambahan"
                      {...register("tambahanPenyakitPenyerta")}
                      isReadOnly={false}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Vaskularisasi</FormLabel>
                    <Select
                      defaultValue={"Baik"}
                      {...register("vaskularisasi", { required: true })}
                    >
                      <option value={"Baik"}>Baik</option>
                      <option value={"Kurang Baik"}>Kurang Baik</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status Psikologis</FormLabel>
                    <Select
                      defaultValue={"Ada"}
                      {...register("statusPsikologis", { required: true })}
                    >
                      <option value={"Ada"}>Ada</option>
                      <option value={"Tidak Ada"}>Tidak Ada</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Mobilisai</FormLabel>
                    <Select
                      defaultValue={"Jalan"}
                      {...register("mobilisasi", { required: true })}
                    >
                      <option value={"Jalan"}>Jalan</option>
                      <option value={"Duduk"}>Duduk</option>
                      <option value={"Tirah Baring"}>Tirah Baring</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Obat - obatan yang digunakan</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan obat - obatan yang digunakan"
                      {...register("obatObatan", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Merokok</FormLabel>
                    <Select
                      defaultValue={"Ya"}
                      {...register("merokok", { required: true })}
                    >
                      <option value={"Ya"}>Ya</option>
                      <option value={"Tidak"}>Tidak</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>
                <Center w={"full"}>
                  <Button
                    colorScheme={"whatsapp"}
                    type={"submit"}
                    isLoading={loading1}
                  >
                    Simpan
                  </Button>
                </Center>
              </Box>
            )}
          </Collapse>
        </Box>
        <Divider my={4} />
        <Box>
          <Flex
            w={"full"}
            cursor={"pointer"}
            onClick={() => setStepTwo(!stepTwo)}
          >
            <Heading as={"h5"} size={"md"}>
              Pengkajian Lokal Luka
            </Heading>
            {isDone[2] && (
              <Tag size={"sm"} variant="solid" colorScheme="whatsapp" mx={2}>
                Sudah Diisi
              </Tag>
            )}
            <Spacer />
            {stepTwo ? (
              <Icon as={AiOutlineMinus} />
            ) : (
              <Icon as={AiOutlineDown} />
            )}
          </Flex>
          <Collapse in={stepTwo} animateOpacity>
            {isDone[2] ? (
              <Center my={4}>Data sudah diisi.</Center>
            ) : (
              <Box
                as="form"
                onSubmit={handleSubmitLokalLuka(onSubmitLokalLuka)}
              >
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={4}
                  mx={2}
                  my={4}
                >
                  <FormControl>
                    <FormLabel>Tipe luka</FormLabel>
                    <Select
                      defaultValue={"Akut"}
                      {...registerLokalLuka("tipeLuka", { required: true })}
                    >
                      <option value={"Akut"}>Akut</option>
                      <option value={"Kronis"}>Kronis</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tipe penyembuhan luka</FormLabel>
                    <Select
                      defaultValue={"Fase Inflamasi"}
                      {...registerLokalLuka("tipePenyembuhanLuka", {
                        required: true,
                      })}
                    >
                      <option value={"Fase Inflamasi"}>Fase Inflamasi</option>
                      <option value={"Fase Proliperasi"}>
                        Fase Proliperasi
                      </option>
                      <option value={"Fase Maturase"}>Fase Maturase</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Kunjungan ke</FormLabel>
                    <Input
                      type="number"
                      placeholder="Masukkan kunjungan"
                      {...registerLokalLuka("kunjungan", { required: true })}
                    />
                    <Box my={2} />
                    <SingleDatepicker
                      name="tanggal-kunjungan-input"
                      date={tanggalKunjungan}
                      onDateChange={setTanggalKunjungan}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Upload foto</FormLabel>
                    <Input
                      type="file"
                      placeholder="Masukkan Foto"
                      {...registerLokalLuka("foto", { required: true })}
                    />
                  </FormControl>
                </SimpleGrid>

                <Center w={"full"}>
                  <Button
                    colorScheme={"whatsapp"}
                    type={"submit"}
                    isLoading={loading2}
                  >
                    Simpan
                  </Button>
                </Center>
              </Box>
            )}
          </Collapse>
        </Box>
        <Divider my={4} />
        <Box>
          <Flex
            w={"full"}
            cursor={"pointer"}
            onClick={() => setStepThree(!stepThree)}
          >
            <Heading as={"h5"} size={"md"}>
              TTV
            </Heading>
            {isDone[3] && (
              <Tag size={"sm"} variant="solid" colorScheme="whatsapp" mx={2}>
                Sudah Diisi
              </Tag>
            )}
            <Spacer />
            {stepThree ? (
              <Icon as={AiOutlineMinus} />
            ) : (
              <Icon as={AiOutlineDown} />
            )}
          </Flex>
          <Collapse in={stepThree} animateOpacity>
            {isDone[3] ? (
              <Center my={4}>Data sudah diisi.</Center>
            ) : (
              <Box as="form" onSubmit={handleSubmitTTV(onSubmitTTV)}>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={4}
                  mx={2}
                  my={4}
                >
                  <FormControl>
                    <FormLabel>Tekanan darah</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan tekanan darah"
                      {...registerTTV("tekananDarah", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nadi</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan nadi"
                      {...registerTTV("nadi", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Pernafasan</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan pernafasan"
                      {...registerTTV("pernafasan", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Suhu</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan Suhu"
                      {...registerTTV("suhu", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>GDS</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan GDS"
                      {...registerTTV("gds", { required: true })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Hasil ABPI</FormLabel>
                    <Input
                      type="text"
                      placeholder="Masukkan GDS"
                      {...registerTTV("hasilAbpi", { required: true })}
                    />
                  </FormControl>
                </SimpleGrid>

                <Center w={"full"}>
                  <Button
                    colorScheme={"whatsapp"}
                    type={"submit"}
                    isLoading={loading3}
                  >
                    Simpan
                  </Button>
                </Center>
              </Box>
            )}
          </Collapse>
        </Box>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default TambahAssesment;
