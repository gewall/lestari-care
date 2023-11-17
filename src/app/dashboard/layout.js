import Sidebar from "@/components/sidebar";
import Dashboard from "@/layouts/dashboard";
import { HStack } from "@chakra-ui/react";

export default function DashboardLayout({ children }) {
  return (
    <HStack spacing={0} alignItems={"flex-start"}>
      <Sidebar />
      {children}
    </HStack>
  );
}
