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

const DetailLokalLuka = ({ params }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getLokalLuka = async () => {
      const result = await getDetailAsssesment({
        menu: "lokal-luka",
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

    getLokalLuka();
  }, []);

  console.log(data);
  return (
    <DashboardLayout>
      <Header title={"Detail Lokal Luka"} />

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
                <FormLabel>Tipe luka</FormLabel>
                <Input
                  type="text"
                  // placeholder="Masukkan kunjungan"
                  value={data?.result?.tipeLuka}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tipe penyembuhan luka</FormLabel>
                <Input
                  type="text"
                  // placeholder="Masukkan kunjungan"
                  value={data?.result?.tipePenyembuhanLuka}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Kunjungan ke</FormLabel>
                <Input
                  type="number"
                  // placeholder="Masukkan kunjungan"
                  value={data?.result?.kunjungan}
                  isReadOnly
                />
                <Box my={2} />
                <Input
                  type="text"
                  // placeholder="Masukkan kunjungan"
                  value={new Date(
                    data?.result?.tanggalKunjungan
                  ).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
                  isReadOnly
                />

                {/* <SingleDatepicker
                name="tanggal-kunjungan-input"
                date={tanggalKunjungan}
                onDateChange={setTanggalKunjungan}
              /> */}
              </FormControl>
              <FormControl>
                <FormLabel>Foto</FormLabel>
                {/* <Input type="file" placeholder="Masukkan Foto" /> */}
                <Card>
                  <CardBody>
                    <CldImage
                      width="250"
                      height="250"
                      src={data?.result?.foto}
                    />
                  </CardBody>
                </Card>
              </FormControl>
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

export default DetailLokalLuka;
