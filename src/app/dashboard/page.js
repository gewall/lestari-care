"use client";

import Card from "@/components/card/Card";
import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import {
  Alert,
  Box,
  Flex,
  Heading,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const { data: session } = useSession();

  const [assesment, setAssesment] = useState(null);
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
  const [piutang, setPiutang] = useState(null);

  useEffect(() => {
    const getAssesments = async () => {
      const req = await fetch("/api/assesment/all");

      const res = await req.json();

      setAssesment(res);
    };

    const getPiutang = async () => {
      const req = await fetch("/api/keuangan/piutang");

      const res = await req.json();

      setPiutang(res);
    };

    const getAssesmentChart = async () => {
      const req = await fetch(
        `/api/keuangan/assesment?fromDate=${new Date(
          new Date().setMonth(new Date().getMonth() - 1)
        )}&&toDate=${new Date()}`
      );
      console.log(req);
      const res = await req.json();

      if (!req.ok) return;

      const nominal = res.result?.map((item) => item.biaya);
      const tanggal = res.result?.map((item) =>
        new Date(item.tanggalBayar).toLocaleDateString("id-ID")
      );

      // setAssesment(res.result);
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

    getAssesmentChart();
    getAssesments();
    getPiutang();
  }, []);

  return (
    <DashboardLayout>
      <Header title={"Dashboard"} />

      <ContentWrapper>
        <StatGroup>
          <Stat
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            rounded="md"
            p={4}
            color={"white"}
          >
            <StatLabel>Kunjungan Pasien</StatLabel>
            <StatNumber>
              {" "}
              {
                assesment?.result?.filter(
                  (i) =>
                    new Date(i.tanggal).getMonth() === new Date().getMonth()
                ).length
              }
            </StatNumber>
            <StatHelpText>Bulan Ini</StatHelpText>
          </Stat>
        </StatGroup>
        <Box my={4} />
        {session?.user.role === "ADMIN" && (
          <Stack flexDir={{ base: "column", md: "row" }} spacing={4}>
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
        )}

        {session?.user.role === "ADMIN" && (
          <Fragment>
            <Box my={4}>
              <Alert status="success" variant="left-accent">
                Laporan Keuangan Assesment
              </Alert>
            </Box>
            <Box w={"full"}>
              <Chart
                options={assesmentChart.options}
                series={assesmentChart.series}
                type="line"
                width="100%"
              />
            </Box>
          </Fragment>
        )}
      </ContentWrapper>
      {/* <Wrap my={4}>
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
      </Wrap> */}
    </DashboardLayout>
  );
}
