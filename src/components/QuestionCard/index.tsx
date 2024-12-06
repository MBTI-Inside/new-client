import { Question } from "@/@types";
import useRouter from "@/hooks/useRouter";
import { themeColor } from "@/styles/color";
import { Card, Flex, Badge, Progress, Text } from "@mantine/core";

const TypeColor = {
  energy: themeColor.red?.[4],
  awareness: themeColor.blue?.[4],
  judgement: themeColor.yellow?.[4],
  life: themeColor.green?.[4],
};

const mbtiTypeColor = {
  E: themeColor.orange?.[4],
  I: themeColor.violet?.[4],
  N: themeColor.teal?.[4],
  S: themeColor.lime?.[4],
  T: themeColor.blue?.[4],
  F: themeColor.pink?.[4],
  J: themeColor.indigo?.[4],
  P: themeColor.yellow?.[4],
};

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
      bg={TypeColor[question.mbtiType]}
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
