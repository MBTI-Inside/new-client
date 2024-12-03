import { CommentLikeResponse, CommentPost } from "@/@types";
import {
  Paper,
  Flex,
  Menu,
  ActionIcon,
  ButtonGroup,
  Button,
  Text,
} from "@mantine/core";
import {
  IconCornerDownRight,
  IconDotsVertical,
  IconHeart,
  IconMessage2,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { CommentForm } from "@/components/CommentForm";
import { notifications } from "@mantine/notifications";
import { useHandleError } from "@/hooks/useHandleError";
import useCustomMutation from "@/hooks/useCustomMutation";

interface CommentCardProps {
  comment: CommentPost;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const [isReply, setIsReply] = useState(false);

  const { mutate } = useCustomMutation<CommentLikeResponse>(
    ["get-memo", "get-comments"],
    {
      method: "patch",
    }
  );

  const handleClickLike = (id: string) => {
    mutate(
      {
        url: `/comments/${id}/like`, // 동적 URL
      },
      {
        onSuccess: (data: CommentLikeResponse) => {
          notifications.show({
            title: <Text>{comment.nickName}님의 댓글을 좋아합니다.</Text>,
            message: <Text>공감이 {data.likeCount}개가 되었어요! 🥰</Text>,
            color: "blue",
          });
        },
        onError: (error: Error) => {
          notifications.show({
            title: "공감 실패",
            message: "공감 클릭 중 오류가 발생했어요. 😥",
            color: "red",
          });
          setError(error);
        },
      }
    );
  };

  return (
    <Fragment>
      <Paper w="100%" shadow="md" p="xs" radius="md" bg="cyan.4">
        <Flex direction="column" gap="xs">
          <Flex direction="column">
            <Flex w="100%" justify="space-between">
              <Text fw={600}>{comment.nickName}</Text>
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
            <Text size="sm">{comment.content}</Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <ButtonGroup>
              <Button
                size="xs"
                variant="subtle"
                leftSection={<IconHeart />}
                color="dark"
                onClick={() => handleClickLike(comment._id)}
              >
                {comment.likeCount}
              </Button>
              {!comment.parentCommentId && (
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconMessage2 />}
                  color="dark"
                  onClick={() => {
                    setIsReply((prev) => !prev);
                  }}
                >
                  {isReply ? "답글 취소" : "답글"}
                </Button>
              )}
            </ButtonGroup>
            <Text ta="end">
              {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm").toString()}
            </Text>
          </Flex>
        </Flex>
      </Paper>
      {isReply && (
        <Flex gap="xs" w="100%">
          <IconCornerDownRight size="1.5rem" />
          <CommentForm
            memoId={comment.memoId}
            parentCommentId={comment._id}
            onSubmit={() => setIsReply(false)}
          />
        </Flex>
      )}
    </Fragment>
  );
};
