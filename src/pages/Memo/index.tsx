import { MemoPost } from "@/@types";
import axiosRequest from "@/api";
import { Note } from "@/components/Note";
import { useHandleError } from "@/hooks/useHandleError";
import { useModal } from "@/hooks/useModal";
import { useInView } from "react-intersection-observer";
import { ActionIcon, Flex, Text, Loader, Badge } from "@mantine/core";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { MemoCard } from "@/components/MemoCard";
import { Search } from "@/components/Search";

interface SearchCriteria {
  field: string; // 검색 필드 이름 (e.g., "mbtiType", "subject")
  text: string; // 검색할 값
}

const FIELD_LABELS: Record<string, string> = {
  mbtiType: "유형",
  title: "제목",
  content: "내용",
};

const MemoPage = () => {
  const setError = useHandleError(); // 에러 핸들링 함수
  const { openModal } = useModal();
  const [limit] = useState(5);
  const [search, setSearch] = useState<SearchCriteria[]>([]); // 배열 형태로 검색 조건 관리

  const {
    data: memos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ["get-memos", JSON.stringify(search)],
    ({ pageParam: skip }) =>
      axiosRequest.requestAxios<MemoPost[]>(
        "get",
        `/memos?limit=${limit}&skip=${skip}&search=${JSON.stringify(search)}`
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
          <ActionIcon
            radius="100%"
            size="4rem"
            color="cyan"
            onClick={() => {
              openModal(
                <Search type="personalities" />,
                null,
                "검색어 추가",
                true
              ).then((result) => {
                if (Array.isArray(result) && result.length > 0) {
                  setSearch((prev) => {
                    // 기존 상태와 새로 추가된 데이터를 병합하면서 중복 제거
                    const merged = [
                      ...prev,
                      ...result.filter(
                        (newItem) =>
                          !prev.some(
                            (existingItem) =>
                              existingItem.field === newItem.field &&
                              existingItem.text === newItem.text
                          )
                      ),
                    ];
                    return merged;
                  });
                }
              });
            }}
          >
            <IconSearch size="2rem" />
          </ActionIcon>
          <ActionIcon
            radius="100%"
            size="4rem"
            onClick={() => {
              openModal(<Note />, null, "메모 작성").then((result) => {
                if (result) {
                  refetch();
                }
              });
            }}
          >
            <IconPlus size="2rem" />
          </ActionIcon>
        </Flex>
      </Flex>
      {search.length > 0 && (
        <Flex gap="sm" wrap="wrap" p="md">
          {search.map((item) => (
            <Badge
              key={item.field + item.text}
              color="cyan"
              size="lg"
              variant="filled"
              rightSection={
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  color="white"
                  onClick={() => {
                    // 상태에서 해당 항목 제거
                    setSearch((prev) =>
                      prev.filter(
                        (existingItem) =>
                          !(
                            existingItem.field === item.field &&
                            existingItem.text === item.text
                          )
                      )
                    );
                  }}
                >
                  <IconX />
                </ActionIcon>
              }
            >
              {`${FIELD_LABELS[item.field]}: ${item.text}`}
            </Badge>
          ))}
        </Flex>
      )}
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
