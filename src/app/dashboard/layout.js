import Sidebar from "@/components/sidebar";

import { HStack } from "@chakra-ui/react";

export default function DashboardLayout({ children }) {
  return (
    <HStack spacing={0} alignItems={"flex-start"} as={"section"}>
      <Sidebar />
      {children}
    </HStack>
  );
}
