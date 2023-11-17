import { Box, Flex } from "@chakra-ui/react";

export default function Dashboard({ children }) {
  return (
    <Flex
      bgColor={"gray.50"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      w={"full"}
      px={4}
      direction={"column"}
    >
      {children}
    </Flex>
  );
}
