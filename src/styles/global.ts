import { AppShell, MantineTheme } from "@mantine/core";

export const globalTheme = {
  components: {
    AppShell: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.colors.violet[2], // 원하는 배경색 설정
        },
        header: {
          borderBottom: "none",
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
