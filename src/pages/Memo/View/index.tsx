import { CommentPost, MemoLikeResponse, MemoPost } from "@/@types";
import axiosRequest from "@/api";
import { CommentCard } from "@/components/CommentCard";
import { CommentForm } from "@/components/CommentForm";
import { Confirm } from "@/components/Confirm";
import { Note } from "@/components/Note";
import { PasswordForm } from "@/components/PasswordForm";
import useCustomMutation from "@/hooks/useCustomMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useHandleError } from "@/hooks/useHandleError";
import { useModal } from "@/hooks/useModal";
import useRouter from "@/hooks/useRouter";
import { findColorArray } from "@/utils/findColor";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconArrowLeft,
  IconCornerDownRight,
  IconDotsVertical,
  IconHeart,
  IconMessage2,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";

const buildCommentTree = (comments: CommentPost[]) => {
  const commentMap: Record<string, CommentPost & { children: CommentPost[] }> =
    {};
  const tree: CommentPost[] = [];

  // 데이터 맵으로 변환
  comments.forEach((comment) => {
    commentMap[comment._id] = { ...comment, children: [] };
  });

  // 트리 구조 생성
  comments.forEach((comment) => {
    if (comment.parentCommentId) {
      commentMap[comment.parentCommentId]?.children.push(
        commentMap[comment._id]
      );
    } else {
      tree.push(commentMap[comment._id]);
    }
  });

  return tree;
};

const MemoViewPage = () => {
  const { navigateTo, goBack, params } = useRouter();
  const { id } = params as { id: string };
  useEffect(() => {
    if (!id) {
      console.error("ID is missing.");
      return;
    }
  }, [id]);

  const setError = useHandleError(); // 에러 핸들링 함수
  const { openModal, closeModal } = useModal();
  const { data: memo, refetch: memoRefetch } = useCustomQuery(["get-memo"], {
    method: "get",
    url: `/memos/${id}`,
    queryFn: () => axiosRequest.requestAxios<MemoPost>("get", `/memos/${id}`),
    enabled: !!id,
  });

  const { data: comments, refetch: commentsRefetch } = useCustomQuery(
    ["get-memo", "get-comments"],
    {
      method: "get",
      url: `/comments/${id}`,
      queryFn: () =>
        axiosRequest.requestAxios<CommentPost[]>("get", `/comments/${id}`),
      enabled: !!id,
    }
  );

  const bgColor = findColorArray(memo?.cardColor);
  const commentTreeData = buildCommentTree(comments ?? []);

  const { mutate: likeMutate } = useCustomMutation<MemoLikeResponse>(
    ["get-memo", "get-comments"],
    {
      method: "patch",
    }
  );

  const { mutate: checkMutate } = useCustomMutation([""], {
    method: "post",
  });

  const { mutate: deleteMutate } = useCustomMutation(["get-memos"], {
    method: "delete",
  });

  const handleClickLike = (id: string) => {
    likeMutate(
      {
        url: `/memos/${id}/like`, // 동적 URL
      },
      {
        onSuccess: (data: MemoLikeResponse) => {
          notifications.show({
            title: (
              <Flex direction="column">
                <Text lineClamp={1} fw={600}>
                  {memo?.title}
                </Text>
                <Text>글을 좋아합니다.</Text>
              </Flex>
            ),
            message: <Text>공감이 {data.likeCount}개가 되었어요! 🥰</Text>,
            color: "blue",
          });
          memoRefetch();
          commentsRefetch();
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

  const handleCheckPassword = (password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      checkMutate(
        {
          url: `/memos/${id}`,
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
          url: `/memos/${id}`,
        },
        {
          onSuccess: () => {
            notifications.show({
              title: "메모 삭제 완료",
              message: "메모가 삭제되었습니다. 😀",
              color: "blue",
            });
            resolve(true); // 성공 시 true 반환
          },
          onError: (error: Error) => {
            notifications.show({
              title: "메모 삭제 실패",
              message: "메모가 삭제되지 않았어요. 😥",
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
    <Flex
      direction="column"
      w="100%"
      h="100%"
      bg={bgColor?.[6] ?? "#FFFFF"}
      p="md"
      gap="md"
    >
      <Flex justify="space-between" align="center">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.5rem">{memo?.mbtiType}</Text>
        <Menu shadow="md" withArrow withinPortal>
          <Menu.Target>
            <ActionIcon variant="subtle" color="dark">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                openModal(<PasswordForm />, null, "비밀번호 입력").then(
                  async (password) => {
                    const result = await handleCheckPassword(
                      password as string
                    );

                    if (result) {
                      openModal(<Note id={id} />, null, "메모 수정", true).then(
                        (result) => {
                          if (result) {
                            memoRefetch();
                            commentsRefetch();
                          }
                        }
                      );
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
                      password as string
                    );

                    if (result) {
                      openModal(
                        <Confirm
                          message={<Text>정말로 삭제하시겠어요? 😢</Text>}
                          yesCallback={async () => {
                            const result = await handleDelete(id);

                            if (result) {
                              navigateTo("/memo");
                              // TODO: goBack으로도 충분한지 확인 필요
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
      <Flex h="100%">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          bg={bgColor?.[4] ?? "#FFFFF"}
          w="100%"
          h="100%"
        >
          <Flex direction="column" gap="sm" justify="space-between">
            <Flex direction="column" gap="md">
              <Group justify="space-between">
                <Text fw={600}>{memo?.title}</Text>
              </Group>
              <Text size="md" h="24rem">
                {memo?.content}
              </Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <ButtonGroup>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconHeart />}
                  color="dark"
                  onClick={() => handleClickLike(memo?._id as string)}
                >
                  {memo?.likeCount}
                </Button>
              </ButtonGroup>
              <Text ta="end">2024-11-29 13:57</Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Flex direction="column" w="100%" gap="xs">
        <Flex w="100%" justify="space-between" gap="xs" align="center">
          <Flex gap="xs">
            <Text fz="lg">댓글</Text>
            <IconMessage2 />
            <Text fz="lg">[{memo?.cmtCount}]</Text>
          </Flex>
          <Button
            onClick={() => {
              openModal(
                <CommentForm memoId={memo?._id as string} />,
                null,
                "댓글 작성",
                true
              ).then((result) => {
                if (result) {
                  memoRefetch();
                  commentsRefetch();
                }
              });
            }}
          >
            작성
          </Button>
        </Flex>
        {!memo?.cmtCount && <Text>댓글이 존재하지 않습니다.</Text>}
        {commentTreeData &&
          commentTreeData.map((comment) => {
            if (!comment.parentCommentId) {
              return (
                <Fragment key={comment._id}>
                  <Flex direction="column" gap="xs" w="100%" key={comment._id}>
                    <CommentCard
                      comment={comment}
                      bgColor={bgColor?.[4] ?? "#FFFFF"}
                      onSubmit={() => {
                        memoRefetch();
                        commentsRefetch();
                      }}
                    />
                  </Flex>
                  {comment.children &&
                    comment.children.map((childComment) => {
                      return (
                        <Flex gap="xs" w="100%" key={childComment._id}>
                          <IconCornerDownRight size="1.5rem" />
                          <Flex direction="column" gap="xs" w="100%">
                            <CommentCard
                              comment={childComment}
                              bgColor={bgColor?.[4] ?? "#FFFFF"}
                              onSubmit={() => {
                                memoRefetch();
                                commentsRefetch();
                              }}
                            />
                          </Flex>
                        </Flex>
                      );
                    })}
                </Fragment>
              );
            }
            return (
              <Flex direction="column" gap="xs" w="100%" key={comment._id}>
                <CommentCard
                  comment={comment}
                  bgColor={bgColor?.[4] ?? "#FFFFF"}
                  onSubmit={() => {
                    memoRefetch();
                    commentsRefetch();
                  }}
                />
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
};

export default MemoViewPage;
