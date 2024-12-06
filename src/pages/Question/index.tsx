import axiosRequest from "@/api";
import { useHandleError } from "@/hooks/useHandleError";
import { useInView } from "react-intersection-observer";
import { ActionIcon, Flex, Text, Loader } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { Question } from "@/@types";
import { QuestionCard } from "@/components/QuestionCard";

const QuestionPage = () => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const [limit] = useState(5);

  const {
    data: questions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["get-surveys"],
    ({ pageParam: skip }) =>
      axiosRequest.requestAxios<Question[]>(
        "get",
        `/surveys?limit=${limit}&skip=${skip}`
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
          QuestBTI
        </Text>
        <Flex gap="sm">
          <ActionIcon radius="100%" size="4rem" color="cyan">
            <IconSearch size="2rem" />
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
        {questions?.pages.map((page, pageIndex) => {
          return (
            <Fragment key={pageIndex}>
              {page.map((data) => {
                return <QuestionCard question={data} />;
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

export default QuestionPage;
