import {
  Button,
  Flex,
  Paper,
  PasswordInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface CommentFormProps {
  memoId: string;
  id?: string;
}

export const CommentForm = ({ memoId, id }: CommentFormProps) => {
  console.log(memoId, id);
  const form = useForm({
    initialValues: {
      nickName: "",
      content: "",
      password: "",
    },
  });

  // 댓글 입력은 창이 협소하므로 유효성 검사 이후 문제 있으면 notification 표시할 것
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
