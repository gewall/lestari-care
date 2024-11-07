"use client";

import Auth from "@/layouts/auth";
import {
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      username: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });

    setIsLoading(false);
    if (res?.ok) {
      console.log("ok");
      router.push("/dashboard");
    } else {
      console.log(res.error);
      toast({
        title: "Tidak Dapat Masuk",
        description: "Email Atau Password Salah",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const getData = async () => {
    const req = await fetch("/api/user/auth", { method: "POST" });
    const res = await req.json();

    console.log(res);
  };

  return (
    <Auth>
      <Center bgColor={"green.300"} w={"full"} py={4} roundedTop={12}>
        <Heading color={"white"}>Masuk</Heading>
      </Center>
      <VStack as={"form"} onSubmit={handleSubmit(onSubmit)} p={4}>
        <FormControl isInvalid={errors.email}>
          <FormLabel>Alamat Email </FormLabel>
          <Input type="email" {...register("email", { required: true })} />
          {errors.email && (
            <FormErrorMessage>Email dibutuhkan.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.email && (
            <FormErrorMessage>Password terlalu pendek.</FormErrorMessage>
          )}
        </FormControl>
        <ButtonGroup>
          {/* <Button colorScheme={"twitter"} onClick={getData}>
            Daftar
          </Button> */}
          <Button colorScheme={"whatsapp"} type="submit" isLoading={isLoading}>
            Masuk
          </Button>
        </ButtonGroup>
      </VStack>
    </Auth>
  );
};

export default Login;
