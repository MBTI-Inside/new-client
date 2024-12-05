import { CommentPost } from "@/@types";
import axiosRequest from "@/api";
import useCustomMutation from "@/hooks/useCustomMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useHandleError } from "@/hooks/useHandleError";
import { useModal } from "@/hooks/useModal";
import {
  Button,
  Flex,
  PasswordInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

interface CommentFormProps {
  memoId: string;
  parentCommentId?: string | null;
  id?: string;
}

export const CommentForm = ({
  memoId,
  parentCommentId,
  id,
}: CommentFormProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { closeModal } = useModal();
  const info = {
    method: id ? "patch" : "post",
    url: id ? `/comments/${id}` : `/comments/${memoId}`,
  };

  const { data: comment } = useCustomQuery(
    ["get-comment", memoId, id as string],
    {
      method: "get",
      url: `/comments/id/${id}`,
      queryFn: () =>
        axiosRequest.requestAxios<CommentPost>("get", `/comments/id/${id}`),
      enabled: !!id,
      options: {
        suspense: !!id, // id가 있을 때만 Suspense 활성화
      },
    }
  );

  const { mutate } = useCustomMutation(["get-memo", "get-comments"], {
    method: info.method as "patch" | "post",
  });

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      nickName: id ? comment?.nickName : "",
      parentCommentId: parentCommentId || null,
      content: id ? comment?.content : "",
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
            color: "blue",
          });

          form.reset();
          closeModal(data);
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
    <Flex direction="column" gap="xs" p="xs">
      <TextInput
        w="100%"
        placeholder="닉네임"
        {...form.getInputProps("nickName")}
      />
      <PasswordInput
        size="sm"
        w="100%"
        placeholder="비밀번호"
        {...form.getInputProps("password")}
      />
      <Textarea
        placeholder="댓글을 입력해 주세요."
        {...form.getInputProps("content")}
      />
      <Button onClick={() => handleSubmit()}>등록</Button>
    </Flex>
  );
};
