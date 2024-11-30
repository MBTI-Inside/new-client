import { MBTI_OPTIONS_DATA } from "@/constants/MBTIOptions";
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
import { useForm } from "@mantine/form";

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

export const Note = () => {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      password: "",
      mbtiType: {
        energy: initialEnergy,
        awareness: initialAwareness,
        judgement: initialJudgement,
        life: initialLife,
      },
      cardColor: randomColor,
    },
  });

  return (
    <Flex direction="column" w="16rem" gap="sm">
      <TextInput label="제목" placeholder="제목을 입력하세요." />
      <Textarea label="내용" placeholder="내용을 입력하세요." />
      <PasswordInput
        label="비밀번호"
        placeholder="메모 비밀번호를 입력하세요."
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
      <Button>등록</Button>
    </Flex>
  );
};
