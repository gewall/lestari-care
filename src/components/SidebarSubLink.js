import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Link } from "@chakra-ui/next-js";
import { Box, Collapse, HStack, Icon, Text, VStack } from "@chakra-ui/react";

const SidebarSubLink = ({ isShowed, title, icon, subMenus }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const setExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <VStack w={"full"} cursor={"pointer"} alignItems={"flex-start"}>
      <Box
        onClick={setExpand}
        position={"relative"}
        overflow={"hidden"}
        borderLeftStyle="solid"
        borderLeftWidth="4px"
        borderLeftColor={"gray.600"}
        bgColor={"gray.600"}
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
      </Box>

      <Collapse
        in={isExpanded}
        animateOpacity
        style={{
          width: "100%",
          flexWrap: "nowrap",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {subMenus.map((item, i) => (
          <Link
            key={i}
            href={item?.href}
            position={"relative"}
            overflow={"hidden"}
            borderLeftStyle="solid"
            borderLeftWidth="4px"
            borderLeftColor={pathname == item?.href ? "green.300" : "gray.600"}
            bgColor={pathname == item?.href ? "gray.700" : "gray.600"}
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
              ml={!isShowed ? "-8px" : 8}
              justifyContent={!isShowed && "center"}
              transition={"all ease-in-out .5s"}
            >
              <Icon
                as={item.icon}
                w={{ base: 6, md: isShowed ? 6 : 8 }}
                h={{ base: 6, md: isShowed ? 6 : 8 }}
                transition={"all ease-in-out .2s"}
              />
              {isShowed && <Text>{item.title}</Text>}
            </HStack>
          </Link>
        ))}
      </Collapse>
    </VStack>
  );
};

export default SidebarSubLink;
