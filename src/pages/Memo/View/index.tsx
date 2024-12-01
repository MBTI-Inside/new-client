import { MemoLikeResponse, MemoPost } from "@/@types";
import axiosRequest from "@/api";
import { CommentCard } from "@/components/CommentCard";
import { CommentForm } from "@/components/CommentForm";
import useCustomMutation from "@/hooks/useCustomMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useHandleError } from "@/hooks/useHandleError";
import useRouter from "@/hooks/useRouter";
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

const MemoViewPage = () => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { goBack, params } = useRouter();
  const { id } = params as { id: string };

  const { data: memo } = useCustomQuery(["get-memo"], {
    method: "get",
    url: `/memos/${id}`,
    queryFn: () => axiosRequest.requestAxios<MemoPost>("get", `/memos/${id}`),
    enabled: !!id,
  });

  const { mutate } = useCustomMutation<MemoLikeResponse>(["get-memo"], {
    method: "patch",
  });

  const handleClickLike = (id: string) => {
    mutate(
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
    <Flex direction="column" w="100%" h="100%" bg="cyan" p="md" gap="md">
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
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          bg="cyan.4"
          w="100%"
          h="100%"
        >
          <Flex direction="column" gap="sm" justify="space-between">
            <Flex direction="column" gap="md">
              <Group justify="space-between">
                <Text fw={600}>{memo?.title}</Text>
              </Group>
              <Text size="md" h="20rem">
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
        <Flex w="100%" justify="flex-start" gap="xs" align="center">
          <Text fz="lg">댓글</Text>
          <IconMessage2 />
          <Text fz="lg">[{memo?.cmtCount}]</Text>
        </Flex>
        {!memo?.cmtCount && <Text>댓글이 존재하지 않습니다.</Text>}
        <Flex gap="xs" w="100%">
          {CommentCard()}
        </Flex>
        <Flex gap="xs" w="100%">
          <IconCornerDownRight size="1.5rem" />
          {CommentCard()}
        </Flex>
        {/* 답글 버튼 클릭 시 표시 */}
        <Flex gap="xs" w="100%">
          <IconCornerDownRight size="1.5rem" />
          {CommentForm()}
        </Flex>
        {/* -------------------------------------------- */}
        <Flex gap="xs" w="100%">
          <IconCornerDownRight size="1.5rem" />
          {CommentCard()}
        </Flex>
        {CommentCard()}
      </Flex>
      {CommentForm()}
    </Flex>
  );
};

export default MemoViewPage;
