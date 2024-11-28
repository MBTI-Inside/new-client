import useRouter from "@/hooks/useRouter";
import {
  ActionIcon,
  Image,
  Group,
  Button,
  Card,
  Flex,
  Text,
  Badge,
  ButtonGroup,
} from "@mantine/core";
import {
  IconHeart,
  IconMessage2,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";

const MemoPage = () => {
  const { navigateTo } = useRouter();

  return (
    <Flex direction="column" w="100%" h="100vh" bg="dark">
      {/* 헤더 영역은 고정되도록 하고 싶긴 함 sticky? */}
      <Flex p="md" w="100%" justify="space-between" align="center">
        <Text size="2rem" c="white">
          MemoBTI
        </Text>
        <Flex gap="sm">
          <ActionIcon radius="100%" size="4rem" color="cyan">
            <IconSearch size="2rem" />
          </ActionIcon>
          <ActionIcon radius="100%" size="4rem">
            <IconPlus size="2rem" />
          </ActionIcon>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        w="100%"
        bg="dark"
        p="md"
        gap="md"
        justify="center"
      >
        <Card shadow="sm" padding="lg" radius="md" bg="cyan.4" h="12rem">
          <Flex direction="column" gap="sm" justify="space-between" h="100%">
            <Flex
              direction="column"
              gap="md"
              onClick={() => navigateTo("/memo/123")}
            >
              <Group justify="space-between">
                <Text fw={600}>What is Lorem Ipsum?</Text>
                <Badge color="pink">ESFP</Badge>
              </Group>
              <Text size="md" lineClamp={3} h="4.5rem">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <ButtonGroup>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconHeart />}
                  color="dark"
                >
                  12
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconMessage2 />}
                  color="dark"
                >
                  6
                </Button>
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" bg="grape.4" h="12rem">
          <Flex direction="column" gap="sm" justify="space-between" h="100%">
            <Flex
              direction="column"
              gap="md"
              onClick={() => navigateTo("/memo/123")}
            >
              <Group justify="space-between">
                <Text fw={600}>What is Lorem Ipsum?</Text>
                <Badge color="pink">ESFP</Badge>
              </Group>
              <Text size="md" lineClamp={3} h="4.5rem">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <ButtonGroup>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconHeart />}
                  color="dark"
                >
                  12
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconMessage2 />}
                  color="dark"
                >
                  6
                </Button>
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" bg="yellow.4" h="12rem">
          <Flex direction="column" gap="sm" justify="space-between" h="100%">
            <Flex
              direction="column"
              gap="md"
              onClick={() => navigateTo("/memo/123")}
            >
              <Group justify="space-between">
                <Text fw={600}>What is Lorem Ipsum?</Text>
                <Badge color="pink">ESFP</Badge>
              </Group>
              <Text size="md" lineClamp={3} h="4.5rem">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <ButtonGroup>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconHeart />}
                  color="dark"
                >
                  12
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconMessage2 />}
                  color="dark"
                >
                  6
                </Button>
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" bg="teal.4" h="12rem">
          <Flex direction="column" gap="sm" justify="space-between" h="100%">
            <Flex
              direction="column"
              gap="md"
              onClick={() => navigateTo("/memo/123")}
            >
              <Group justify="space-between">
                <Text fw={600}>What is Lorem Ipsum?</Text>
                <Badge color="pink">ESFP</Badge>
              </Group>
              <Text size="md" lineClamp={3} h="4.5rem">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <ButtonGroup>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconHeart />}
                  color="dark"
                >
                  12
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconMessage2 />}
                  color="dark"
                >
                  6
                </Button>
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Card>
        <Text ta="center" c="white">
          페이지의 끝!
        </Text>
      </Flex>
    </Flex>
  );
};

export default MemoPage;
