import { MemoPost } from "@/@types";
import axiosRequest from "@/api";
import { MBTI_OPTIONS_DATA } from "@/constants/MBTIOptions";
import useCustomMutation from "@/hooks/useCustomMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { useModal } from "@/hooks/useModal";
import { themeColor } from "@/styles/color";
import {
  Flex,
  TextInput,
  Text,
  Textarea,
  PasswordInput,
  SegmentedControl,
  ColorSwatch,
  CheckIcon,
  rem,
  Button,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const cardColors = Object.entries(themeColor)
  .filter(([key]) => key !== "dark") // dark 제외
  .map(([, colors]) => colors[6]); // 6번째 인덱스 가져오기

// 랜덤 index 값을 가져오는 함수
const getRandomIndex = (array: string[]) =>
  Math.floor(Math.random() * array.length);

// 랜덤한 색상 가져오기
const randomColor = cardColors[getRandomIndex(cardColors)];

// 랜덤한 MBTI 유형 가져오기
const initialEnergy =
  MBTI_OPTIONS_DATA.energy[getRandomIndex(MBTI_OPTIONS_DATA.energy)];
const initialAwareness =
  MBTI_OPTIONS_DATA.awareness[getRandomIndex(MBTI_OPTIONS_DATA.awareness)];
const initialJudgement =
  MBTI_OPTIONS_DATA.judgement[getRandomIndex(MBTI_OPTIONS_DATA.judgement)];
const initialLife =
  MBTI_OPTIONS_DATA.life[getRandomIndex(MBTI_OPTIONS_DATA.life)];

interface NoteProps {
  id?: string;
}

export const Note = ({ id }: NoteProps) => {
  const { closeModal } = useModal();
  const info = {
    method: id ? "patch" : "post",
    url: id ? `/memos/${id}` : "/memos",
  };

  const { data: memo } = useCustomQuery(["get-memo"], {
    method: "get",
    url: `/memos/${id}`,
    queryFn: () => axiosRequest.requestAxios<MemoPost>("get", `/memos/${id}`),
    enabled: !!id,
  });

  const { mutate } = useCustomMutation(["get-memos"], {
    method: info.method as "patch" | "post",
  });

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: memo?.title || "",
      content: memo?.content || "",
      password: "",
      mbtiType: {
        energy: initialEnergy,
        awareness: initialAwareness,
        judgement: initialJudgement,
        life: initialLife,
      },
      cardColor: randomColor,
    },
    validate: {
      title: (value) =>
        !value.length
          ? "제목을 입력해 주세요."
          : value.length > 20
            ? "제목은 20자 이내로 입력해 주세요."
            : null,
      content: (value) =>
        !value.length
          ? "내용을 입력해 주세요."
          : value.length > 100
            ? "내용은 100자 이내로 입력해 주세요."
            : null,
      password: (value) => (!value.length ? "비밀번호를 입력해 주세요." : null),
    },
  });

  // 제출 버튼 클릭 시 실행될 함수
  const handleSubmit = () => {
    mutate(
      {
        url: info.url, // 동적 URL
        data: {
          ...form.values,
          mbtiType: `${form.values.mbtiType.energy}${form.values.mbtiType.awareness}${form.values.mbtiType.judgement}${form.values.mbtiType.life}`,
        },
      },
      {
        onSuccess: (data) => {
          notifications.show({
            title: "메모지 작성 성공",
            message: "메모가 작성되었어요! 🌟",
            color: "green",
          });
          closeModal(data);
        },
        onError: (error) => {
          throw error;
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" w="16rem" gap="sm">
        <TextInput
          key={form.key("title")}
          label="제목"
          placeholder="제목을 입력하세요."
          {...form.getInputProps("title")}
        />
        <Textarea
          label="내용"
          placeholder="내용을 입력하세요."
          {...form.getInputProps("content")}
        />
        <PasswordInput
          label="비밀번호"
          placeholder="메모 비밀번호를 입력하세요."
          {...form.getInputProps("password")}
        />
        <Text>MBTI 유형 선택</Text>
        <Flex gap="sm">
          <SegmentedControl
            w="100%"
            data={["E", "I"]}
            {...form.getInputProps("mbtiType.energy")}
          />
          <SegmentedControl
            w="100%"
            data={["S", "N"]}
            {...form.getInputProps("mbtiType.awareness")}
          />
        </Flex>
        <Flex gap="sm">
          <SegmentedControl
            w="100%"
            data={["T", "F"]}
            {...form.getInputProps("mbtiType.judgement")}
          />
          <SegmentedControl
            w="100%"
            data={["J", "P"]}
            {...form.getInputProps("mbtiType.life")}
          />
        </Flex>
        <Text>배경색 선택</Text>
        <Flex w="100%" gap="xs" wrap="wrap">
          {cardColors.map((color) => {
            return (
              <ColorSwatch
                key={color}
                component="button"
                color={color}
                size="2.7rem"
                radius="xs"
                withShadow
                onClick={() => form.setFieldValue("cardColor", color)}
              >
                {form.values.cardColor === color && (
                  <CheckIcon style={{ width: rem(12), height: rem(12) }} />
                )}
              </ColorSwatch>
            );
          })}
        </Flex>
        <Button type="submit">등록</Button>
      </Flex>
    </form>
  );
};
