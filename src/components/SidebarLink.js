import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import React from "react";
import { usePathname } from "next/navigation";

const SidebarLink = ({ isShowed, title, icon, href }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      position={"relative"}
      overflow={"hidden"}
      borderLeftStyle="solid"
      borderLeftWidth="4px"
      borderLeftColor={pathname == href ? "green.300" : "gray.600"}
      bgColor={pathname == href ? "gray.700" : "gray.600"}
      _hover={{
        overflow: "hidden",
        textDecoration: "none",
        bgColor: "gray.700",
        borderLeftStyle: "solid",
        borderLeftWidth: "4px",
        borderLeftColor: "green.300",
      }}
      transition={"all ease-in-out .2s"}
      py={2}
      //   px={16}
      //   pl={{ base: 3, md: 4 }}
      w={"full"}
    >
      <HStack
        ml={!isShowed ? "-4px" : 4}
        justifyContent={!isShowed && "center"}
        transition={"all ease-in-out .5s"}
      >
        <Icon
          as={icon}
          w={{ base: 6, md: isShowed ? 6 : 8 }}
          h={{ base: 6, md: isShowed ? 6 : 8 }}
          transition={"all ease-in-out .2s"}
        />
        {isShowed && <Text>{title}</Text>}
      </HStack>
    </Link>
  );
};

export default SidebarLink;
