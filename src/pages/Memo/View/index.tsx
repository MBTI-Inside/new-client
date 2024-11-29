import useRouter from "@/hooks/useRouter";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Group,
  Menu,
  Paper,
  PasswordInput,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCornerDownRight,
  IconDotsVertical,
  IconHeart,
  IconMessage2,
} from "@tabler/icons-react";

const CommentForm = () => {
  return (
    <Paper w="100%" p="xs" bg="cyan.4">
      <Flex direction="column" gap="xs">
        <Flex gap="xs" w="100%" align="center">
          <TextInput w="40%" placeholder="닉네임" />
          <PasswordInput w="100%" placeholder="비밀번호" />
          <Button w="25%" size="sm">
            등록
          </Button>
        </Flex>
        <Textarea placeholder="댓글을 입력해 주세요." />
      </Flex>
    </Paper>
  );
};

const MemoViewPage = () => {
  const { goBack } = useRouter();

  return (
    <Flex direction="column" w="100%" h="100%" bg="cyan" p="md" gap="md">
      <Flex justify="space-between" align="center">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.5rem">ESTJ</Text>
        <Menu shadow="md" withArrow withinPortal>
          <Menu.Target>
            <ActionIcon variant="subtle" color="dark">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                console.log("비밀번호 입력");
              }}
            >
              <Text fz="1.5rem">수정</Text>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                console.log("비밀번호 입력");
              }}
            >
              <Text fz="1.5rem">삭제</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Flex h="100%">
        <Card shadow="sm" padding="lg" radius="md" bg="cyan.4" h="100%">
          <Flex direction="column" gap="sm" justify="space-between">
            <Flex direction="column" gap="md">
              <Group justify="space-between">
                <Text fw={600}>What is Lorem Ipsum?</Text>
              </Group>
              <Text size="md" h="20rem">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more a
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
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Flex direction="column" w="100%" gap="xs">
        <Flex w="100%" justify="flex-start" gap="xs" align="center">
          <Text fz="lg">댓글</Text>
          <IconMessage2 />
          <Text fz="lg">[6]</Text>
        </Flex>
        <Text>댓글이 존재하지 않습니다.</Text>
        <Paper shadow="md" p="xs" radius="md" bg="cyan.4">
          <Flex direction="column" gap="xs">
            <Flex direction="column">
              <Flex w="100%" justify="space-between">
                <Text fw={600}>닉네임1</Text>
                <Menu shadow="md" withArrow withinPortal>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="dark" size="sm">
                      <IconDotsVertical />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        console.log("비밀번호 입력");
                      }}
                    >
                      <Text fz="1.5rem">수정</Text>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        console.log("비밀번호 입력");
                      }}
                    >
                      <Text fz="1.5rem">삭제</Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Text size="sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
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
                  onClick={() => {
                    console.log("답글 폼 표시");
                  }}
                >
                  답글
                </Button>
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Paper>
        <Flex gap="xs" w="100%">
          <IconCornerDownRight size="2rem" />
          <Paper shadow="md" p="xs" radius="md" bg="cyan.4">
            <Flex direction="column" gap="xs">
              <Flex direction="column">
                <Flex w="100%" justify="space-between">
                  <Text fw={600}>닉네임1</Text>
                  <Menu shadow="md" withArrow withinPortal>
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="dark" size="sm">
                        <IconDotsVertical />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => {
                          console.log("비밀번호 입력");
                        }}
                      >
                        <Text fz="1.5rem">수정</Text>
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          console.log("비밀번호 입력");
                        }}
                      >
                        <Text fz="1.5rem">삭제</Text>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
                <Text size="sm">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text
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
                    onClick={() => {
                      console.log("답글 폼 표시");
                    }}
                  >
                    답글
                  </Button>
                </ButtonGroup>
                <Text ta="end">2024-11-29 13:57</Text>
              </Flex>
            </Flex>
          </Paper>
        </Flex>
        {/* 답글 버튼 클릭 시 표시 */}
        <Flex gap="xs" w="100%">
          <IconCornerDownRight size="1rem" />
          {CommentForm()}
        </Flex>
        {/* -------------------------------------------- */}
        <Flex gap="xs" w="100%">
          <IconCornerDownRight size="2rem" />
          <Paper shadow="md" p="xs" radius="md" bg="cyan.4">
            <Flex direction="column" gap="xs">
              <Flex direction="column">
                <Flex w="100%" justify="space-between">
                  <Text fw={600}>닉네임1</Text>
                  <Menu shadow="md" withArrow withinPortal>
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="dark" size="sm">
                        <IconDotsVertical />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => {
                          console.log("비밀번호 입력");
                        }}
                      >
                        <Text fz="1.5rem">수정</Text>
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          console.log("비밀번호 입력");
                        }}
                      >
                        <Text fz="1.5rem">삭제</Text>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
                <Text size="sm">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text
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
                    onClick={() => {
                      console.log("답글 폼 표시");
                    }}
                  >
                    답글
                  </Button>
                </ButtonGroup>
                <Text ta="end">2024-11-29 13:57</Text>
              </Flex>
            </Flex>
          </Paper>
        </Flex>
        <Paper shadow="md" p="xs" radius="md" bg="cyan.4">
          <Flex direction="column" gap="xs">
            <Flex direction="column">
              <Flex w="100%" justify="space-between">
                <Text fw={600}>닉네임1</Text>
                <Menu shadow="md" withArrow withinPortal>
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="dark" size="sm">
                      <IconDotsVertical />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        console.log("비밀번호 입력");
                      }}
                    >
                      <Text fz="1.5rem">수정</Text>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        console.log("비밀번호 입력");
                      }}
                    >
                      <Text fz="1.5rem">삭제</Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Text size="sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text
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
                  onClick={() => {
                    console.log("답글 폼 표시");
                  }}
                >
                  답글
                </Button>
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Paper>
      </Flex>
      {CommentForm()}
    </Flex>
  );
};

export default MemoViewPage;
