import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";

const Auth = ({ children }) => {
  return (
    <Center h={"100vh"} w={"100vw"} bgColor={"gray.100"}>
      <Box w={{ base: "80vw", md: "36vw" }} bgColor={"gray.50"} rounded={12}>
        {children}
      </Box>
    </Center>
  );
};

export default Auth;
