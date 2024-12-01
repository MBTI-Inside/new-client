import {
  Paper,
  Flex,
  Menu,
  ActionIcon,
  ButtonGroup,
  Button,
  Text,
} from "@mantine/core";
import { IconDotsVertical, IconHeart, IconMessage2 } from "@tabler/icons-react";

export const CommentCard = () => {
  return (
    <Paper w="100%" shadow="md" p="xs" radius="md" bg="cyan.4">
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
            industry. Lorem Ipsum has been the industry's standard dummy text
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
  );
};
