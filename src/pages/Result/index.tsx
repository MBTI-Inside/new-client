import { MBTI, MBTIProportion, MBTIProportions } from "@/@types";
import { MBTIElementOption } from "@/@types/Question";
import axiosRequest from "@/api";
import Character from "@/components/Character";
import {
  MBTI_TYPE_COLORS,
  MBTI_TYPE_COLORS_PAIRS,
  mbtiTypeColor,
} from "@/constants/MBTIColors";
import {
  MBTI_OPTIONS_DATA,
  MBTI_TYPES_OPTIONS,
  MBTI_TYPES_VALUE,
} from "@/constants/MBTIOptions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useRouter from "@/hooks/useRouter";
import { themeColor } from "@/styles/color";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  GridCol,
  Progress,
  Text,
  Title,
} from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";

// 주어진 배열의 rate 합이 100이 되도록 조정하는 함수
const normalizeRates = (array: MBTIProportion[]): MBTIProportion[] => {
  const total = array.reduce((sum, item) => sum + item.rate, 0); // 총합 계산

  // 각 항목의 정수 비율을 계산하고 반올림
  const adjustedRates = array.map((item) => ({
    ...item,
    rate: Math.round((item.rate / total) * 100),
  }));

  // 정수 합계를 계산하여 100과의 차이를 구함
  const difference =
    100 - adjustedRates.reduce((sum, item) => sum + item.rate, 0);

  // 차이가 있다면, 가장 큰 비율 항목에 차이를 더해 보정
  if (difference !== 0) {
    const maxItem = adjustedRates.reduce((prev, curr) =>
      curr.rate > prev.rate ? curr : prev
    );
    maxItem.rate += difference;
  }

  return adjustedRates;
};

// 모든 키에 대해 rate를 조정하는 함수
const normalizeStateRates = (state: MBTIProportions): MBTIProportions => {
  const normalizedState: MBTIProportions = {
    energy: normalizeRates(state.energy),
    awareness: normalizeRates(state.awareness),
    judgement: normalizeRates(state.judgement),
    life: normalizeRates(state.life),
  };
  return normalizedState;
};

const ResultPage = () => {
  const { navigateTo, params, location } = useRouter();
  const { mbti } = params as { mbti: string };

  const bgColor = MBTI_TYPE_COLORS[mbti];
  const color = MBTI_TYPE_COLORS_PAIRS[mbti];

  const { data: mbtiData } = useCustomQuery(["get-result"], {
    method: "get",
    url: `/mbtis/${mbti}`,
    queryFn: () => axiosRequest.requestAxios<MBTI>("get", `/mbtis/${mbti}`),
    options: {
      staleTime: 1000 * 5 * 60,
    },
  });
  console.log(location.state);

  // 실행
  let normalizedState: MBTIProportions = {
    energy: [],
    awareness: [],
    judgement: [],
    life: [],
  };

  if (location.state) {
    normalizedState = normalizeStateRates(location.state as MBTIProportions);
  }

  const firstRowTags = mbtiData?.tags.slice(0, 2); // 상단 태그
  const secondRowTags = mbtiData?.tags.slice(2); // 하단 태그

  return (
    <Flex direction="column">
      <Flex justify="space-between" p="md" align="center">
        <Text size="3rem">{mbtiData?.type}</Text>
        <ActionIcon
          radius="100%"
          size="4rem"
          color={color}
          onClick={() => {
            // TODO: 공유 링크 로직 적용
          }}
        >
          <IconLink />
        </ActionIcon>
      </Flex>
      <Character bgColor={bgColor} color={color} />
      <Flex direction="column" w="100%" h="100%" bg={bgColor} gap="lg" p="md">
        <Flex direction="column" gap="lg" justify="center">
          <Text size="1.5rem" fw={700} ta="center">
            {mbtiData?.summary}
          </Text>
          <Text size="1rem" style={{ lineHeight: "1.5rem" }}>
            {mbtiData?.content}
          </Text>
          <Flex w="100%" direction="column" gap="md">
            <Flex w="100%" justify="center" gap="xl">
              {firstRowTags?.map((tag) => {
                return (
                  <Badge w="8rem" color={color}>
                    #{tag}
                  </Badge>
                );
              })}
            </Flex>
            <Flex w="100%" justify="center" gap="xl">
              {secondRowTags?.map((tag) => {
                return (
                  <Badge w="8rem" color={color}>
                    #{tag}
                  </Badge>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
        {Object.keys(normalizedState).some(
          (key) => normalizedState[key as keyof MBTIProportions].length > 0
        ) && (
          <Flex direction="column" gap="md">
            <Text size="1.5rem" fw={700} ta="center">
              내 검사 결과
            </Text>
            <Flex direction="column" gap="md">
              {MBTI_TYPES_OPTIONS.map((mbti) => {
                return (
                  <Flex key={mbti} direction="column" gap="xs">
                    <Text size="lg" fw={700} ta="center">
                      {MBTI_TYPES_VALUE[mbti]}
                    </Text>
                    <Flex gap="xs" align="center">
                      <Text fw={700}>{normalizedState[mbti][0].rate}%</Text>
                      <Progress.Root w="100%" size="2rem">
                        {normalizedState[mbti]?.map(
                          (state: { type: string; rate: number }) => {
                            return (
                              <Progress.Section
                                value={state.rate}
                                color={
                                  mbtiTypeColor[state.type as MBTIElementOption]
                                }
                              >
                                <Progress.Label>{state.type}</Progress.Label>
                              </Progress.Section>
                            );
                          }
                        )}
                      </Progress.Root>
                      <Text fw={700}>{normalizedState[mbti][1].rate}%</Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        )}
        <Flex direction="column" gap="lg" p="md">
          <Text size="1.5rem" fw={700} ta="center">
            유형별 관계성
          </Text>
          {mbtiData?.fit.map((mbti) => {
            return (
              <Card
                bg={
                  mbti.type === "good" ? themeColor.red[2] : themeColor.blue[2]
                }
                padding="md"
              >
                <Flex gap="xs" justify="space-between" mb="md">
                  <Text fw={600}>
                    {mbti.type === "good" ? "잘" : "안"} 어울리는 유형
                  </Text>
                  <Text fw={600}>{mbti.mbti}</Text>
                </Flex>
                <Text style={{ whiteSpace: "normal" }}>{mbti.description}</Text>
              </Card>
            );
          })}
        </Flex>
        <Flex direction="column" gap="xs" p="md">
          <Button
            size="xl"
            color="yellow.4"
            onClick={() => navigateTo("/test")}
          >
            테스트 하러가기
          </Button>
          <Button size="xl" color="teal.4" onClick={() => navigateTo("/stats")}>
            유형통계 보러가기
          </Button>
          <Button size="xl" color="cyan.4" onClick={() => navigateTo("/memo")}>
            메모지 보러가기
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResultPage;
