import { Question } from "@/@types";
import { MBTIType } from "@/@types/Question";
import axiosRequest from "@/api";
import { MBTIDatasOption } from "@/constants/MBTIOptions";
import useCustomMutation from "@/hooks/useCustomMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import useRouter from "@/hooks/useRouter";
import { calculateMbtiProportion, determineMBTI } from "@/utils/mbtiCalculate";
import { Button, Flex, Progress, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChecklist,
} from "@tabler/icons-react";
import { useState, Fragment } from "react";

export interface MBTITypeAnswer extends Answer {
  mbtiType: keyof MBTIDatasOption;
}

type MBTIElementOption = "E" | "I" | "N" | "S" | "T" | "F" | "J" | "P";

interface Answer {
  type: MBTIElementOption;
  content: string;
  proportion: number;
}

interface SelectedAnswers extends Answer {
  mbtiType: MBTIType;
}

const TestPage = () => {
  const { navigateTo } = useRouter();
  const [seq, setSeq] = useState(0);
  const form = useForm<{ answers: SelectedAnswers[] }>({
    initialValues: {
      answers: [],
    },
  });

  const { data: questions } = useCustomQuery(["get-survey-questions"], {
    method: "get",
    url: "/surveys/mbti/test",
    queryFn: () =>
      axiosRequest.requestAxios<Question[]>("get", "/surveys/mbti/test"),
    options: {
      staleTime: 1000 * 5 * 60,
    },
  });

  const { mutate } = useCustomMutation(["get-survey-questions"], {
    method: "patch",
  });

  const handleSetAnswer = (mbtiType: string, answer: Answer, index: number) => {
    // 해당하는 index에 선택된 데이터가 있다면 요소를 교체하기 위해 해당 index에 대한 요소를 제거한다.
    const isSelectedAnswer = form.values.answers.length !== index;

    if (isSelectedAnswer) {
      form.removeListItem("answers", index);
    }

    // 해당하는 index에 insertListItem으로 요소를 추가한다.
    form.insertListItem(
      "answers",
      {
        content: answer.content,
        proportion: answer.proportion,
        type: answer.type,
        mbtiType,
      },
      index
    );
  };

  const onSubmit = () => {
    const mbtiResult = calculateMbtiProportion(form.values.answers);
    const mbtiTypeResult = determineMBTI(mbtiResult);

    mutate(
      {
        url: `/mbtis/${mbtiTypeResult}`, // 동적 URL
      },
      {
        onSuccess: () => {
          // TODO: 로딩 좀 걸어주면 좋을 것 같은뎅..
          navigateTo(`/result/${mbtiTypeResult}`, mbtiResult);
        },
        onError: (error) => {
          throw error;
        },
      }
    );
  };

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      gap="sm"
      p="md"
      justify="center"
      bg="dark"
    >
      {questions?.map((question, index) => {
        return (
          index === seq && (
            <Fragment key={question._id}>
              <Flex direction="column" gap="sm">
                <Text size="1.5rem" c="white">
                  # {(index + 1).toString().padStart(2, "0")}
                </Text>
                <Text size="1.5rem" c="white">
                  {question.subject}
                </Text>
              </Flex>
              <Flex direction="column" gap="lg" p="sm">
                {question.answer.map((answer) => {
                  const isSelected =
                    answer.content === form.values.answers[index]?.content;

                  return (
                    <Button
                      key={answer.content + answer.proportion + answer.type}
                      variant={isSelected ? "filled" : "outline"}
                      color="violet"
                      bg={isSelected ? "" : "white"}
                      w="100%"
                      h="8rem"
                      p="sm"
                      onClick={() => {
                        handleSetAnswer(question.mbtiType, answer, index);

                        if (index < questions.length - 1) {
                          setSeq((_) => index + 1);
                        }
                      }}
                    >
                      <Text style={{ whiteSpace: "normal" }}>
                        {answer.content}
                      </Text>
                    </Button>
                  );
                })}
              </Flex>
              <Flex w="100%" justify="space-between" p="sm">
                <Button
                  color="violet"
                  leftSection={<IconArrowLeft />}
                  disabled={!index}
                  onClick={() => setSeq((_) => index - 1)}
                >
                  이전
                </Button>
                {index < questions.length - 1 && (
                  <Button
                    color="violet"
                    rightSection={<IconArrowRight />}
                    onClick={() => setSeq((_) => index + 1)}
                    disabled={index === form.values.answers.length}
                  >
                    다음
                  </Button>
                )}
                {index === questions.length - 1 && (
                  <Button
                    color="teal"
                    rightSection={<IconChecklist />}
                    onClick={() => onSubmit()}
                    disabled={form.values.answers.length !== questions.length}
                  >
                    제출
                  </Button>
                )}
              </Flex>
              <Flex direction="column" gap="sm">
                <Text size="1rem" c="white" ta="end">
                  {seq + 1} / 16
                </Text>
                <Progress color="violet" value={((seq + 1) / 16) * 100} />
              </Flex>
            </Fragment>
          )
        );
      })}
    </Flex>
  );
};

export default TestPage;
