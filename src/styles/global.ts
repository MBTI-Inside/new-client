import { AppShell, MantineTheme } from "@mantine/core";

export const globalTheme = {
  components: {
    AppShell: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.colors.violet[2], // 원하는 배경색 설정
          minHeight: "100vh", // 화면 전체 채우기 (옵션)
        },
        header: {
          borderBottom: "none",
        },
        footer: {
          borderTop: "none",
        },
      }),
    },
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          outline: "none",
        },
      }),
    },
    Drawer: {
      styles: (theme: MantineTheme) => ({
        content: {
          backgroundColor: theme.colors.violet[2], // 원하는 배경색 설정
        },
      }),
    },
  },
};
