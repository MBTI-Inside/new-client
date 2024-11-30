import { MemoLikeResponse, MemoPost } from "@/@types";
import useRouter from "@/hooks/useRouter";
import dayjs from "dayjs";
import {
  Card,
  Flex,
  Group,
  Badge,
  Text,
  ButtonGroup,
  Button,
} from "@mantine/core";
import { IconHeart, IconMessage2 } from "@tabler/icons-react";
import useCustomMutation from "@/hooks/useCustomMutation";
import { useHandleError } from "@/hooks/useHandleError";
import { notifications } from "@mantine/notifications";

interface MemoCardProps {
  memo?: MemoPost;
}

export const MemoCard = ({ memo }: MemoCardProps) => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { navigateTo } = useRouter();

  const { mutate } = useCustomMutation<MemoLikeResponse>(["get-memos"], {
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
    memo && (
      <Card shadow="sm" padding="lg" radius="md" bg="cyan.4" h="12rem">
        <Flex direction="column" gap="sm" justify="space-between" h="100%">
          <Flex
            direction="column"
            gap="md"
            onClick={() => navigateTo(`/memo/${memo._id}`)}
          >
            <Group justify="space-between">
              <Text fw={600}>{memo.title}</Text>
              <Badge color="dark">{memo.mbtiType}</Badge>
            </Group>
            <Text size="md" lineClamp={3} h="4.5rem">
              {memo.content}
            </Text>
          </Flex>
          <Flex w="100%" justify="space-between" align="center">
            <ButtonGroup>
              <Button
                size="xs"
                variant="subtle"
                leftSection={<IconHeart />}
                color="dark"
                onClick={() => handleClickLike(memo._id)}
              >
                {memo.likeCount}
              </Button>
              <Button
                size="xs"
                variant="subtle"
                leftSection={<IconMessage2 />}
                color="dark"
              >
                {memo.cmtCount}
              </Button>
            </ButtonGroup>
            <Text ta="end">
              {dayjs(memo.createdAt).format("YYYY-MM-DD HH:mm").toString()}
            </Text>
          </Flex>
        </Flex>
      </Card>
    )
  );
};
