"use client";

import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import {
  AiFillDashboard,
  AiOutlineAlipay,
  AiOutlineClose,
  AiOutlineContainer,
  AiOutlineDashboard,
  AiOutlineException,
  AiOutlineFileSync,
  AiOutlineFileText,
  AiOutlineGold,
  AiOutlineLineChart,
  AiOutlineRight,
  AiOutlineSolution,
  AiOutlineTeam,
} from "react-icons/ai";
import { useState } from "react";
import SidebarLink from "./SidebarLink";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const [isShowed, setIsShowed] = useState(true);

  const isShowedControl = () => {
    setIsShowed(isShowed ? false : true);
  };

  const { data: session } = useSession();

  return (
    <Flex
      maxW={{ base: "100vw", md: "20vw" }}
      bgColor={"gray.600"}
      color={"white"}
      h={"100vh"}
      w={{ base: isShowed ? "full" : "16vw", md: isShowed ? "full" : "8vw" }}
      top={0}
      transition={"all ease-in-out .5s"}
      direction={"column"}
    >
      <Center py={8}>
        <Text>Lestari Care(Logo)</Text>
      </Center>
      <VStack w={"full"} alignItems={"flex-start"} overflowY={"auto"} flex={1}>
        <SidebarLink
          icon={AiOutlineDashboard}
          title={"Dashboard"}
          isShowed={isShowed}
          href={"/dashboard"}
        />
        <SidebarLink
          icon={AiOutlineSolution}
          title={"Pendaftaran Pasien"}
          isShowed={isShowed}
          href={"/pendaftaran-pasien"}
        />
        <SidebarLink
          icon={AiOutlineFileText}
          title={"Assesment"}
          isShowed={isShowed}
          href={"/assesment"}
        />
        <SidebarLink
          icon={AiOutlineTeam}
          title={"Askep"}
          isShowed={isShowed}
          href={"/askep"}
        />
        {session?.user.role === "ADMIN" && (
          <SidebarLink
            icon={AiOutlineException}
            title={"Surat Informasi Concent"}
            isShowed={isShowed}
            href={"/surat-informasi-concent"}
          />
        )}
        {session?.user.role === "ADMIN" && (
          <SidebarLink
            icon={AiOutlineFileSync}
            title={"Surat Rujukan"}
            isShowed={isShowed}
            href={"/surat-rujukan"}
          />
        )}
        <SidebarLink
          icon={AiOutlineGold}
          title={"Stok"}
          isShowed={isShowed}
          href={"/stok"}
        />
        {session?.user.role === "ADMIN" && (
          <SidebarLink
            icon={AiOutlineContainer}
            title={"Insentif Karyawan"}
            isShowed={isShowed}
            href={"/insentif-karyawan"}
          />
        )}
        {session?.user.role === "ADMIN" && (
          <SidebarLink
            icon={AiOutlineLineChart}
            title={"Laporan Keuangan"}
            isShowed={isShowed}
            href={"/laporan-keuangan"}
          />
        )}
      </VStack>
      <Center
        // position={"absolute"}
        // bottom={5}
        // right={{ base: isShowed ? 5 : 2, md: isShowed ? 5 : 5 }}
        transition={"all ease-in-out .5s"}
        bgColor={"gray.600"}
        zIndex={999}
        w={"full"}
        py={4}
      >
        <IconButton
          variant={"outline"}
          color={"white"}
          icon={isShowed ? <AiOutlineClose /> : <AiOutlineRight />}
          isRound={true}
          onClick={isShowedControl}
        ></IconButton>
      </Center>
    </Flex>
  );
}
