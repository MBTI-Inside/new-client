import { BarChart } from "@mantine/charts";
import { Button, Flex } from "@mantine/core";
const data = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

const StatsPage = () => {
  return (
    <Flex w="100%" h="100%">
      <Flex w="100%">
        <BarChart
          h={200}
          data={data}
          dataKey="month"
          orientation="vertical"
          yAxisProps={{ width: 80 }}
          barProps={{ radius: 10 }}
          series={[{ name: "Smartphones", color: "blue.6" }]}
        />
      </Flex>
      <Flex direction="column" gap="sm">
        <Button>문항 보러가기</Button>
        <Button>메모장 보러가기</Button>
      </Flex>
    </Flex>
  );
};

export default StatsPage;
