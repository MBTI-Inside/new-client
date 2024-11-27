import { AppShell } from "@mantine/core";
import React from "react";
import { LayoutHeader } from "@/components/LayoutHeader";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell header={{ height: 72 }} footer={{ height: 72 }}>
      <AppShell.Header>
        <LayoutHeader />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>bbb</AppShell.Footer>
    </AppShell>
  );
};
