"use client";

import Card from "@/components/card/Card";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import { Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  console.log(session, "session");
  return (
    <DashboardLayout>
      <Header title={"Dashboard"} />

      <Wrap my={4}>
        <WrapItem>
          <Card bgColor={"green.300"}>
            <Heading as={"h3"} size={"md"}>
              Jumlah
            </Heading>
          </Card>
        </WrapItem>
        <WrapItem>
          <Card bgColor={"green.300"}>
            <Heading as={"h3"} size={"md"}>
              ALAA
            </Heading>
          </Card>
        </WrapItem>
      </Wrap>
    </DashboardLayout>
  );
}
