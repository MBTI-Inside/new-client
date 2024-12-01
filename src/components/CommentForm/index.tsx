import {
  Button,
  Flex,
  Paper,
  PasswordInput,
  Textarea,
  TextInput,
} from "@mantine/core";

export const CommentForm = () => {
  return (
    <Paper shadow="md" p="xs" radius="md" bg="cyan.4">
      <Flex direction="column" gap="xs">
        <Flex gap="xs" w="100%" align="center">
          <TextInput w="50%" size="sm" placeholder="닉네임" />
          <PasswordInput size="sm" w="100%" placeholder="비밀번호" />
          <Button w="30%" size="sm">
            등록
          </Button>
        </Flex>
        <Textarea placeholder="댓글을 입력해 주세요." />
      </Flex>
    </Paper>
  );
};
