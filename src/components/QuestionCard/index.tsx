import { Question } from "@/@types";
import { mbtiTypeColor, typeColor } from "@/constants/MBTIColors";
import useRouter from "@/hooks/useRouter";
import { Card, Flex, Badge, Progress, Text } from "@mantine/core";

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  const { navigateTo } = useRouter();

  return (
    <Card
      key={question._id}
      shadow="sm"
      padding="md"
      radius="md"
      bg={typeColor[question.mbtiType]}
      h="100%"
      onClick={() => {
        navigateTo(`/question/${question._id}`);
      }}
    >
      <Flex direction="column" justify="space-between" gap="xs" h="8rem">
        <Flex direction="column" gap="xs">
          <Badge color="dark">{question.mbtiType}</Badge>
          <Text size="md" lineClamp={2}>
            {question.subject}
          </Text>
        </Flex>
        <Progress.Root size="2rem">
          {question.answer.map((answer) => {
            return (
              <Progress.Section
                value={answer.proportion}
                color={mbtiTypeColor[answer.type]}
              >
                <Progress.Label>{answer.type}</Progress.Label>
              </Progress.Section>
            );
          })}
        </Progress.Root>
      </Flex>
    </Card>
  );
};
