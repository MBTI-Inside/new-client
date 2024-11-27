import { ActionIcon, Anchor, Drawer, Flex } from "@mantine/core";
import MainLogoSvg from "@/assets/mainlogo.svg";
import useRouter from "@/hooks/useRouter";
import { IconMenu2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const LayoutHeader = () => {
  const { navigateTo } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex w="100%" h="100%" p="xs" justify="space-between" align="center">
      <Anchor
        h="100%"
        onClick={() => {
          navigateTo("/");
        }}
      >
        <MainLogoSvg />
      </Anchor>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="70%"
      >
        {/* Drawer content */}
        hello
      </Drawer>
      <ActionIcon variant="subtle" color="dark" size="3rem" onClick={open}>
        <IconMenu2 size="2.5rem" />
      </ActionIcon>
    </Flex>
  );
};
