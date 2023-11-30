"use client";

import ContentWrapper from "@/components/dashboard/ContentWrapper";
import Header from "@/components/dashboard/Header";
import DashboardLayout from "@/layouts/dashboard";
import {
  Box,
  Heading,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Keuangan = () => {
  const [tes, setTes] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "Gaji",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  const [insentifChart, setInsentifChart] = useState({
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
        name: "Gaji",
        data: [],
      },
    ],
  });
  const [insentif, setInsentif] = useState(null);

  useEffect(() => {
    const getInsentif = async () => {
      const req = await fetch("/api/keuangan/insentif");
      const res = await req.json();

      if (!req.ok) return;

      const nominal = res.result?.map((item) => item.nominal);
      const tanggal = res.result?.map((item) =>
        new Date(item.tanggal).toLocaleDateString()
      );

      console.log(nominal, "res");
      setInsentif(res.result);
      setInsentifChart({
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
            name: "Gaji",
            data: nominal,
          },
        ],
      });
    };

    getInsentif();
  }, []);

  const perbandinganInsentif = () => {
    if (
      insentif
        ?.filter(
          (item) =>
            new Date(item.tanggal).getMonth() === new Date().getMonth() - 1
        )
        .reduce((a, b) => {
          return a.nominal + b.nominal;
        }, 0) === 0
    )
      return insentif
        ?.filter(
          (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
        )
        .reduce((a, b) => a + b.nominal, 0);

    return (
      insentif
        ?.filter(
          (item) =>
            new Date(item.tanggal).getMonth() === new Date().getMonth() - 1
        )
        .reduce((a, b) => {
          return a.nominal + b.nominal;
        }, 0) -
      (insentif
        ?.filter(
          (item) => new Date(item.tanggal).getMonth() === new Date().getMonth()
        )
        .reduce((a, b) => a + b.nominal, 0) /
        insentif
          ?.filter(
            (item) =>
              new Date(item.tanggal).getMonth() === new Date().getMonth() - 1
          )
          .reduce((a, b) => {
            return a.nominal + b.nominal;
          }, 0)) *
        100
    );
  };

  return (
    <DashboardLayout>
      <Header title={"Laporan Keuangan"} />

      <ContentWrapper>
        <StatGroup>
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>23.36%</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>9.05%</StatHelpText>
          </Stat>
        </StatGroup>

        <Stack my={4} spacing={4}>
          <Box>
            <Heading as={"h3"} size={"md"}>
              Pengeluaran Insentif Karyawan
            </Heading>
          </Box>
          <StatGroup>
            <Stat>
              <StatLabel>Bulan Kemarin</StatLabel>
              <StatNumber>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  insentif
                    ?.filter(
                      (item) =>
                        new Date(item.tanggal).getMonth() ===
                        new Date().getMonth() - 1
                    )
                    .reduce((a, b) => {
                      return a.nominal + b.nominal;
                    }, 0)
                )}
              </StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Bulan Sekarang</StatLabel>
              <StatNumber>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  insentif
                    ?.filter(
                      (item) =>
                        new Date(item.tanggal).getMonth() ===
                        new Date().getMonth()
                    )
                    .reduce((a, b) => a + b.nominal, 0)
                )}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    insentif
                      ?.filter(
                        (item) =>
                          new Date(item.tanggal).getMonth() ===
                          new Date().getMonth() - 1
                      )
                      .reduce((a, b) => {
                        return a.nominal + b.nominal;
                      }, 0) <
                    insentif
                      ?.filter(
                        (item) =>
                          new Date(item.tanggal).getMonth() ===
                          new Date().getMonth()
                      )
                      .reduce((a, b) => {
                        return a.nominal + b.nominal;
                      }, 0)
                      ? "decrease"
                      : "increase"
                  }
                />
                {perbandinganInsentif() + "%"}
              </StatHelpText>
            </Stat>
          </StatGroup>
          <Box overflow={"auto"} w={{ md: "fit-content" }}>
            <Chart
              options={insentifChart.options}
              series={insentifChart.series}
              type="line"
              width="500"
            />
          </Box>
        </Stack>
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default Keuangan;
