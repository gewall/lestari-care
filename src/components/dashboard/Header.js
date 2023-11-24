import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import DBreadcrumb from "./DBreadcrumb";
import { usePathname } from "next/navigation";

const Header = ({ title }) => {
  const pathname = usePathname();

  // console.log(pathname.split("/").filter((path) => path));
  return (
    <Box mt={{ base: 4, md: 8 }}>
      <Heading
        as={"h3"}
        size={{ base: "md", md: "lg" }}
        borderLeftStyle={"solid"}
        borderLeftWidth={"4px"}
        borderLeftColor={"green.300"}
        pl={2}
      >
        {title}
      </Heading>
      <Box my={2} />
      <DBreadcrumb links={pathname.split("/").filter((path) => path)} />
    </Box>
  );
};

export default Header;
