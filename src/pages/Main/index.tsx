import Character from "@/components/Character";
import useRouter from "@/hooks/useRouter";
import { Button, Flex, Text } from "@mantine/core";

const MainPage = () => {
  const { navigateTo } = useRouter();
  return (
    <Flex direction="column">
      <Flex direction="column" bg="cyan" pt="lg">
        <Character />
      </Flex>
      <Flex
        direction="column"
        p="md"
        bg="violet.2"
        gap="xs"
        justify="space-between"
        h="100%"
      >
        <Text size="2.5rem" fw={700} ta="center">
          MBTI Inside
        </Text>
        <Button size="xl" color="yellow.4" onClick={() => navigateTo("/test")}>
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
  );
};

export default MainPage;
