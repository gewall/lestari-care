import { Box, Center } from "@chakra-ui/react";
import React from "react";

const Card = ({ children, bgColor, ...props }) => {
  return (
    <Center
      bgColor={bgColor}
      {...props}
      rounded={"md"}
      p={4}
      color={"white"}
      w={{ base: 36, md: 44 }}
      h={28}
    >
      {children}
    </Center>
  );
};

export default Card;
