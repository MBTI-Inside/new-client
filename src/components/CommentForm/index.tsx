import { CommentPost } from "@/@types";
import axiosRequest from "@/api";
import useCustomMutation from "@/hooks/useCustomMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useHandleError } from "@/hooks/useHandleError";
import {
  Button,
  Flex,
  Paper,
  PasswordInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Dispatch, SetStateAction } from "react";

interface CommentFormProps {
  memoId: string;
  parentCommentId?: string | null;
  id?: string;
  onSubmit?: Dispatch<SetStateAction<boolean>>;
}

export const CommentForm = ({
  memoId,
  parentCommentId,
  id,
  onSubmit,
}: CommentFormProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const info = {
    method: id ? "patch" : "post",
    url: id ? `/comments/${id}` : `/comments/${memoId}`,
  };

  const { data: comment } = useCustomQuery(["get-comment"], {
    method: "get",
    url: `/comments/id/${id}`,
    queryFn: () =>
      axiosRequest.requestAxios<CommentPost>("get", `/comments/id/${id}`),
    enabled: !!id,
  });

  const { mutate } = useCustomMutation(["get-memo", "get-comments"], {
    method: info.method as "patch" | "post",
  });

  const form = useForm({
    initialValues: {
      nickName: "",
      parentCommentId: parentCommentId || null,
      content: "",
      password: "",
    },
  });

  const validationCheck = () => {
    const { nickName, content, password } = form.values;
    if (!nickName) {
      notifications.show({
        title: "댓글 작성 실패",
        message: "닉네임을 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (nickName.length > 6) {
      notifications.show({
        title: "댓글 작성 실패",
        message: "닉네임을 6자 이내로 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (!content) {
      notifications.show({
        title: "댓글 작성 실패",
        message: "내용을 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (content.length > 60) {
      notifications.show({
        title: "댓글 작성 실패",
        message: "내용을 60자 이내로 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    if (!password) {
      notifications.show({
        title: "댓글 작성 실패",
        message: "비밀번호를 입력해 주세요. 🥹",
        color: "red",
      });

      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validationCheck()) {
      return;
    }

    mutate(
      {
        url: info.url, // 동적 URL
        data: {
          ...form.values,
        },
      },
      {
        onSuccess: (data) => {
          notifications.show({
            title: `댓글 ${!id ? "작성" : "수정"} 성공`,
            message: `댓글이 ${!id ? "작성" : "수정"}되었어요! 🌟`,
            color: "green",
          });

          if (onSubmit) onSubmit(false);
          form.reset();
        },
        onError: (error) => {
          notifications.show({
            title: `댓글 ${!id ? "작성" : "수정"} 실패`,
            message: `댓글 ${!id ? "작성" : "수정"} 중 오류가 발생했어요. 😥`,
            color: "red",
          });
          setError(error);
        },
      }
    );
  };

  // 댓글 입력은 창이 협소하므로 유효성 검사 이후 문제 있으면 notification 표시할 것
  return (
    <Paper shadow="md" p="xs" radius="md" bg="cyan.4">
      <Flex direction="column" gap="xs">
        <Flex gap="xs" w="100%" align="center">
          <TextInput
            w="50%"
            size="sm"
            placeholder="닉네임"
            {...form.getInputProps("nickName")}
          />
          <PasswordInput
            size="sm"
            w="100%"
            placeholder="비밀번호"
            {...form.getInputProps("password")}
          />
          <Button w="30%" size="sm" onClick={() => handleSubmit()}>
            등록
          </Button>
        </Flex>
        <Textarea
          placeholder="댓글을 입력해 주세요."
          {...form.getInputProps("content")}
        />
      </Flex>
    </Paper>
  );
};
