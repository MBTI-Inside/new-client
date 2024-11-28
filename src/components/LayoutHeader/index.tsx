import { ActionIcon, Anchor, Button, Drawer, Flex } from "@mantine/core";
import MainLogoSvg from "@/assets/mainlogo.svg";
import useRouter from "@/hooks/useRouter";
import { IconMenu2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const LayoutHeader = () => {
  const { navigateTo } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const handleNavigation = (path: string) => {
    navigateTo(path);
    close(); // Drawer 닫기
  };

  return (
    <Flex
      w="100%"
      h="100%"
      p="xs"
      justify="space-between"
      align="center"
      bg="violet.2"
    >
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
        <Flex direction="column" gap="md">
          <Button
            size="xl"
            color="yellow"
            onClick={() => handleNavigation("/test")}
          >
            테스트 하러가기
          </Button>
          <Button
            size="xl"
            color="teal"
            onClick={() => handleNavigation("/stats")}
          >
            유형통계 보러가기
          </Button>
          <Button
            size="xl"
            color="cyan"
            onClick={() => handleNavigation("/memo")}
          >
            메모지 보러가기
          </Button>
        </Flex>
      </Drawer>
      <ActionIcon variant="subtle" color="dark" size="3rem" onClick={open}>
        <IconMenu2 size="2.5rem" />
      </ActionIcon>
    </Flex>
  );
};
