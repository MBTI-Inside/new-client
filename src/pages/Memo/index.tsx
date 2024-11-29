import { useModal } from "@/hooks/useModal";
import useRouter from "@/hooks/useRouter";
import {
  ActionIcon,
  Group,
  Button,
  Card,
  Flex,
  Text,
  Badge,
  ButtonGroup,
  TextInput,
  Textarea,
  PasswordInput,
  SegmentedControl,
  ColorSwatch,
  CheckIcon,
  rem,
} from "@mantine/core";
import {
  IconHeart,
  IconMessage2,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";

const Note = () => {
  const [checkColor, setCheckColor] = useState("#FFFFFF"); // TODO: 배경색 초깃값은 랜덤 색상 지정

  // 색상은 styles/color.ts 데이터 활용
  return (
    <Flex direction="column" w="20rem" gap="sm">
      <TextInput label="제목" placeholder="제목을 입력하세요." />
      <Textarea label="내용" placeholder="내용을 입력하세요." />
      <PasswordInput
        label="비밀번호"
        placeholder="메모 비밀번호를 입력하세요."
      />
      <Text>MBTI 유형 선택</Text>
      <Flex gap="sm">
        <SegmentedControl w="100%" data={["E", "I"]} />
        <SegmentedControl w="100%" data={["S", "N"]} />
      </Flex>
      <Flex gap="sm">
        <SegmentedControl w="100%" data={["T", "F"]} />
        <SegmentedControl w="100%" data={["J", "P"]} />
      </Flex>
      <Text>배경색 선택</Text>
      <Flex w="100%" gap="xs" wrap="wrap">
        <ColorSwatch
          component="button"
          color="#FFFFFF"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#FFFFFF")}
        >
          {checkColor === "#FFFFFF" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#868E96"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#868E96")}
        >
          {checkColor === "#868E96" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#FA5252"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#FA5252")}
        >
          {checkColor === "#FA5252" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#E64980"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#E64980")}
        >
          {checkColor === "#E64980" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#BE4BDB"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#BE4BDB")}
        >
          {checkColor === "#BE4BDB" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#7950F2"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#7950F2")}
        >
          {checkColor === "#7950F2" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#4C6EF5"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#4C6EF5")}
        >
          {checkColor === "#4C6EF5" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#228BE6"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#228BE6")}
        >
          {checkColor === "#228BE6" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#15AABF"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#15AABF")}
        >
          {checkColor === "#15AABF" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#12B886"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#12B886")}
        >
          {checkColor === "#12B886" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#40C057"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#40C057")}
        >
          {checkColor === "#40C057" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#82C91E"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#82C91E")}
        >
          {checkColor === "#82C91E" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#FAB005"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#FAB005")}
        >
          {checkColor === "#FAB005" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
        <ColorSwatch
          component="button"
          color="#FD7E14"
          size="2.3rem"
          radius="xs"
          withShadow
          onClick={() => setCheckColor("#FD7E14")}
        >
          {checkColor === "#FD7E14" && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
        </ColorSwatch>
      </Flex>
      <Button>등록</Button>
    </Flex>
  );
};

const MemoPage = () => {
  const { navigateTo } = useRouter();
  const { openModal } = useModal();

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
          <ActionIcon
            radius="100%"
            size="4rem"
            onClick={() => {
              openModal(<Note />, null, "메모 작성");
            }}
          >
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
