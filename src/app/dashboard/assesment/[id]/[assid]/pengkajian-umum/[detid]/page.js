"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import { getDetailAsssesment } from "@/lib/api/getDataAssesment";
import { createLokalLuka } from "@/lib/api/setDataAssesment";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const DetailPengkajianUmum = ({ params }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getPenkajianUmum = async () => {
      const result = await getDetailAsssesment({
        menu: "pengkajian-umum",
        id: params.assid,
      });

      if (result) {
        setData(result);
      } else {
        toast({
          title: "Gagal Mengambil Data.",
          description: "Data Assesment Gagal Diambil.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    getPenkajianUmum();
  }, []);

  console.log(data);
  return (
    <DashboardLayout>
      <Header title={"Detail Pengkajian Umum"} />

      <ContentWrapper>
        {data === null ? (
          <HStack>
            <Text>Mohon Tunggu...</Text>
            <Spinner color={"green.300"} />
          </HStack>
        ) : (
          <Box as="form">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mx={2} my={4}>
              <FormControl>
                <FormLabel>
                  Riwayat Kejadian Luka dan Perawatan Sebelumnya
                </FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.riwayatKejadianLuka}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Faktor Penyulit Penyembuhan Luka</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.faktorPenyulitPenyembuhan}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status Nutrisi</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.statusNutrisi}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Penyakit Penyerta</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.penyakitPenyerta}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Vaskularisasi</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.vaskularisasi}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status Psikologis</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.statusPsikologis}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mobilisai</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.mobilisasi}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Obat - Obatan yang Digunakan</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.obatObatan}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Merokok</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.merokok}
                  isReadOnly
                />
              </FormControl>

              {/* <SingleDatepicker
                name="tanggal-kunjungan-input"
                date={tanggalKunjungan}
                onDateChange={setTanggalKunjungan}
              /> */}

              {/* <FormControl>
                <FormLabel>Foto</FormLabel>
    
                <Card>
                  <CardBody>
                    <CldImage
                      width="250"
                      height="250"
                      src={data?.result?.foto}
                    />
                  </CardBody>
                </Card>
              </FormControl> */}
            </SimpleGrid>
            <Box>
              <Button
                as={Link}
                colorScheme={"twitter"}
                href={`/dashboard/assesment/${params.id}/${params.assid}/detail`}
              >
                Kembali
              </Button>
            </Box>
          </Box>
        )}
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default DetailPengkajianUmum;
