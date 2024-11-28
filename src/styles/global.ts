import { MantineTheme } from "@mantine/core";

export const globalTheme = {
  components: {
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          outline: "none",
        },
      }),
    },
  },
};
