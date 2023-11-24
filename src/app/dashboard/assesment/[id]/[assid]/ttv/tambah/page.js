"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import { createTTV } from "@/lib/api/setDataAssesment";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TambahTTV = ({ params }) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    setLoading(true);
    const submit = await createTTV({ val: e, params });

    if (submit.status) {
      toast({
        title: "Berhasil Menyimpan Data.",
        description: "Data Assesment Berhasil Disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push(`/dashboard/assesment/${params.id}/${params.assid}/detail`);
    } else {
      toast({
        title: "Gagal Menyimpan Data.",
        description: "Data Assesment Gagal Disimpan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <Header title={"TTV"} />

      <ContentWrapper>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mx={2} my={4}>
            <FormControl>
              <FormLabel>Tekanan darah</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan tekanan darah"
                {...register("tekananDarah", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nadi</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan nadi"
                {...register("nadi", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pernafasan</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan pernafasan"
                {...register("pernafasan", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Suhu</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Suhu"
                {...register("suhu", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>GDS</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan GDS"
                {...register("gds", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Hasil ABPI</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan GDS"
                {...register("hasilAbpi", { required: true })}
              />
            </FormControl>
          </SimpleGrid>

          <Flex w={"full"} justifyContent={"flex-end"}>
            <Button
              colorScheme={"whatsapp"}
              type={"submit"}
              isLoading={loading}
            >
              Simpan
            </Button>
          </Flex>
        </Box>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default TambahTTV;
