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
  Checkbox,
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

const DetailTujuanPerawatan = ({ params }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getTujuanPerawatan = async () => {
      const result = await getDetailAsssesment({
        menu: "tujuan-perawatan",
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

    getTujuanPerawatan();
  }, []);

  console.log(data);
  return (
    <DashboardLayout>
      <Header title={"Detail Tujuan Perawatan"} />

      <ContentWrapper>
        {data === null ? (
          <HStack>
            <Text>Mohon Tunggu...</Text>
            <Spinner color={"green.300"} />
          </HStack>
        ) : (
          <Box as="form">
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mx={2} my={4}>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Angkat Jaringan Nekrosis/Debridemang</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.angkatJaringan}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Angkat Benda Asing(Benang, Dll)</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.angkatBendaAsing}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Rangsang Granulasi</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.rangsangGranulasi}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Percepat Proses Inflamasi</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.percepatProsesInflamasi}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Cegah/Atasi Infeksi</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.cegahInfeksi}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Angkat Bersihkan Biofilm</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.angkatBiofilm}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Ciptakan Kelembaban</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.ciptakanKelembaban}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Pertahan dan Jaga Kelembaban Seimbang</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.jagaKelembaban}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Serap dan Tamping Cairan Luka</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.serapCairanLukan}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Lindungi Kulit Sekitar Luka</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.lindungiKulit}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Dukung Proses Epitelisasi</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.dukungProsesEpitelisasi}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Tipiskan Tepi Luka</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.tipiskanTepiLuka}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Kurangi Faktor Penekanan Pada Luka</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.kurangiFaktorPenekanan}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Kurangi Nyeri</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.kurangiNyeri}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Atasi Bau Tidak Sedap</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.atasiBau}
                  isReadOnly
                ></Checkbox>
              </FormControl>
              <FormControl display={"flex"} justifyContent={"space-between"}>
                <FormLabel>Atasi Hipergranulasi</FormLabel>
                <Checkbox
                  size={"lg"}
                  colorScheme={"whatsapp"}
                  isChecked={data?.result?.atasiHipergranulasi}
                  isReadOnly
                ></Checkbox>
              </FormControl>

              <FormControl>
                <FormLabel>Implementasi</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.implementasi}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Evaluase</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.evaluase}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rencana Tindakan selanjutnya</FormLabel>
                <Input
                  type="text"
                  //   placeholder="Masukkan kunjungan"
                  value={data?.result?.rencanaTindakan}
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

export default DetailTujuanPerawatan;
