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
import { IconDotsVertical, IconHeart, IconMessage2 } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Dispatch, Fragment, SetStateAction } from "react";
import { CommentForm } from "@/components/CommentForm";
import { notifications } from "@mantine/notifications";
import { useHandleError } from "@/hooks/useHandleError";
import useCustomMutation from "@/hooks/useCustomMutation";
import { PasswordForm } from "../PasswordForm";
import { useModal } from "@/hooks/useModal";
import { Confirm } from "../Confirm";

interface CommentCardProps {
  comment: CommentPost;
  bgColor: string;
  onSubmit?: Dispatch<SetStateAction<boolean>>;
}

export const CommentCard = ({
  comment,
  bgColor,
  onSubmit,
}: CommentCardProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { openModal, closeModal } = useModal();

  const { mutate: likeMutate } = useCustomMutation<CommentLikeResponse>(
    ["get-memo", "get-comments"],
    {
      method: "patch",
    }
  );

  const { mutate: checkMutate } = useCustomMutation([""], {
    method: "post",
  });

  const { mutate: deleteMutate } = useCustomMutation(
    ["get-memo", "get-comments"],
    {
      method: "delete",
    }
  );

  const handleClickLike = (id: string) => {
    likeMutate(
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

  const handleCheckPassword = (id: string, password: string) => {
    return new Promise((resolve, reject) => {
      checkMutate(
        {
          url: `/comments/id/${id}`,
          data: {
            password,
          },
        },
        {
          onSuccess: () => {
            notifications.show({
              title: "비밀번호 확인 완료",
              message: "비밀번호 확인 완료되었습니다. 😎",
              color: "blue",
            });
            resolve(true); // 성공 시 true 반환
          },
          onError: (error: Error) => {
            notifications.show({
              title: "비밀번호 확인 실패",
              message: "비밀번호가 일치하지 않아요. 😥",
              color: "red",
            });
            setError(error);
            reject(false); // 실패 시 false 반환
          },
        }
      );
    });
  };

  const handleDelete = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteMutate(
        {
          url: `/comments/${id}`,
          data: {
            memoId: comment.memoId,
          },
        },
        {
          onSuccess: () => {
            notifications.show({
              title: <Text>댓글 삭제 완료</Text>,
              message: <Text>댓글이 삭제되었습니다. 😀</Text>,
              color: "blue",
            });
            resolve(true); // 성공 시 true 반환
          },
          onError: (error: Error) => {
            notifications.show({
              title: "댓글 삭제 실패",
              message: "댓글 삭제 중 오류가 발생했어요. 😥",
              color: "red",
            });
            setError(error);
            reject(false); // 실패 시 false 반환
          },
        }
      );
    });
  };

  return (
    <Fragment>
      <Paper w="100%" shadow="md" p="xs" radius="md" bg={bgColor}>
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
                      openModal(<PasswordForm />, null, "비밀번호 입력").then(
                        async (password) => {
                          const result = await handleCheckPassword(
                            comment._id,
                            password as string
                          );

                          if (result) {
                            openModal(
                              <CommentForm
                                id={comment._id}
                                memoId={comment.memoId}
                              />,
                              null,
                              "댓글 수정",
                              true
                            ).then((result) => {
                              if (result && onSubmit) {
                                onSubmit(true);
                              }
                            });
                          }
                        }
                      ); // 비밀번호 검증
                    }}
                  >
                    <Text fz="1.5rem">수정</Text>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      openModal(<PasswordForm />, null, "비밀번호 입력").then(
                        async (password) => {
                          const result = await handleCheckPassword(
                            comment._id,
                            password as string
                          );

                          if (result) {
                            openModal(
                              <Confirm
                                message="정말로 삭제하시겠어요? 😢"
                                yesCallback={async () => {
                                  const result = await handleDelete(
                                    comment._id
                                  );
                                  if (result && onSubmit) {
                                    onSubmit(true);
                                  }
                                }}
                                commonCallback={() => closeModal(null)}
                              />,
                              null,
                              "메모 삭제",
                              true
                            );
                          }
                        }
                      ); // 비밀번호 검증
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
                    openModal(
                      <CommentForm
                        memoId={comment.memoId}
                        parentCommentId={comment._id}
                      />,
                      null,
                      "댓글 작성",
                      true
                    );
                  }}
                >
                  답글
                </Button>
              )}
            </ButtonGroup>
            <Text ta="end">
              {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm").toString()}
            </Text>
          </Flex>
        </Flex>
      </Paper>
    </Fragment>
  );
};
