import { Box } from "@chakra-ui/react";
import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <Box
      bgColor={"white"}
      p={4}
      rounded={"md"}
      mt={4}
      borderTopColor={"green.300"}
      borderTopStyle={"solid"}
      borderTopWidth={"4px"}
      w={"100%"}
    >
      {children}
    </Box>
  );
};

export default ContentWrapper;
