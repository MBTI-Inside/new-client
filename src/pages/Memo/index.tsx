import { MemoPost } from "@/@types";
import axiosRequest from "@/api";
import { Note } from "@/components/Note";
import { useHandleError } from "@/hooks/useHandleError";
import { useModal } from "@/hooks/useModal";
import { useInView } from "react-intersection-observer";
import { ActionIcon, Flex, Text, Loader } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { MemoCard } from "@/components/MemoCard";

const MemoPage = () => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { openModal } = useModal();

  const [limit] = useState(5);

  const {
    data: memos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["get-memos"],
    ({ pageParam: skip }) =>
      axiosRequest.requestAxios<MemoPost[]>(
        "get",
        `/memos?limit=${limit}&skip=${skip}`
      ),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length * limit : undefined;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: (error: Error) => {
        setError(error);
      },
    }
  );

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  // 요소가 뷰포트에 보이면 fetchNextPage 호출
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <Flex direction="column" w="100%" h="100vh" bg="dark">
      {/* 헤더 영역은 고정되도록 하고 싶긴 함 sticky? */}
      <Flex p="md" w="100%" justify="space-between" align="center">
        <Text size="2rem" c="white">
          MemoBTI
        </Text>
        <Flex gap="sm">
          <ActionIcon radius="100%" size="4rem" color="cyan">
            <IconSearch size="2rem" />
          </ActionIcon>
          <ActionIcon
            radius="100%"
            size="4rem"
            onClick={() => {
              openModal(<Note />, null, "메모 작성");
            }}
          >
            <IconPlus size="2rem" />
          </ActionIcon>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        w="100%"
        bg="dark"
        p="md"
        gap="md"
        justify="center"
      >
        {memos?.pages.map((page, pageIndex) => {
          return (
            <Fragment key={pageIndex}>
              {page.map((data) => {
                return <MemoCard key={data._id} memo={data} />;
              })}
            </Fragment>
          );
        })}
        <Flex ref={ref}>{isFetchingNextPage && <Loader />}</Flex>
        <Text ta="center" c="white">
          페이지의 끝!
        </Text>
      </Flex>
    </Flex>
  );
};

export default MemoPage;
