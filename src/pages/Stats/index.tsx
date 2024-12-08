import { MBTI } from "@/@types";
import axiosRequest from "@/api";
import { MBTI_TYPE_COLORS } from "@/constants/MBTIColors";
import useCustomQuery from "@/hooks/useCustomQuery";
import useRouter from "@/hooks/useRouter";
import { BarChart } from "@mantine/charts";
import { Button, Flex, Text } from "@mantine/core";

const StatsPage = () => {
  const { navigateTo } = useRouter();
  const { data: statsData } = useCustomQuery(["get-stats"], {
    method: "get",
    url: "/mbtis",
    queryFn: () => axiosRequest.requestAxios<MBTI[]>("get", "/mbtis"),
  });

  const stats =
    statsData
      ?.map((data) => ({
        type: data.type,
        count: data.count,
        color: MBTI_TYPE_COLORS[data.type], // 색상 매핑
      }))
      .filter((data) => data.count) ?? [];

  return (
    <Flex direction="column" w="100%" h="100%" bg="dark">
      <Text size="2rem" c="white" p="sm" ta="center">
        MBTI 유형별 통계
      </Text>
      <Flex w="100%" p="md">
        <BarChart
          h={500}
          data={stats}
          dataKey="type" // X축의 데이터를 설정
          orientation="vertical"
          barProps={(data) => ({
            radius: 10,
            fill: data.color, // 데이터에 따라 색상 설정
          })}
          series={[{ name: "count", color: "dark" }]} // 데이터를 표시하는 시리즈
          tickLine="none"
          gridAxis="none"
          withXAxis={false}
        />
      </Flex>
      <Flex direction="column" gap="xs" p="md">
        <Button size="xl" color="yellow.4" onClick={() => navigateTo("/test")}>
          테스트 하러가기
        </Button>
        <Button
          size="xl"
          color="lime.4"
          onClick={() => navigateTo("/question")}
        >
          문항 보러가기
        </Button>
        <Button size="xl" color="teal.4" onClick={() => navigateTo("/stats")}>
          유형통계 보러가기
        </Button>
        <Button size="xl" color="cyan.4" onClick={() => navigateTo("/memo")}>
          메모장 보러가기
        </Button>
      </Flex>
    </Flex>
  );
};

export default StatsPage;
