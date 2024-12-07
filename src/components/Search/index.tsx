import { MBTI_OPTIONS_DATA, MBTI_TYPES_OPTIONS } from "@/constants/MBTIOptions";
import { useModal } from "@/hooks/useModal";
import {
  Button,
  Checkbox,
  Flex,
  SegmentedControl,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface SearchProps {
  type: "types" | "personalities";
}

// 랜덤 index 값을 가져오는 함수
const getRandomIndex = (array: string[]) =>
  Math.floor(Math.random() * array.length);

// 랜덤한 MBTI 유형 가져오기
const initialEnergy =
  MBTI_OPTIONS_DATA.energy[getRandomIndex(MBTI_OPTIONS_DATA.energy)];
const initialAwareness =
  MBTI_OPTIONS_DATA.awareness[getRandomIndex(MBTI_OPTIONS_DATA.awareness)];
const initialJudgement =
  MBTI_OPTIONS_DATA.judgement[getRandomIndex(MBTI_OPTIONS_DATA.judgement)];
const initialLife =
  MBTI_OPTIONS_DATA.life[getRandomIndex(MBTI_OPTIONS_DATA.life)];

export const Search = ({ type }: SearchProps) => {
  const { closeModal } = useModal();
  const form = useForm({
    initialValues: {
      mbtiType: "",
      subject: "",
      mbtiTypeData: {
        energy: initialEnergy,
        awareness: initialAwareness,
        judgement: initialJudgement,
        life: initialLife,
      },
      isUseMbtiTypeData: false,
      title: "",
      content: "",
    },
  });

  // 버튼 활성화 조건
  const isButtonDisabled =
    type === "types"
      ? !form.values.mbtiType && !form.values.subject // types일 경우 조건
      : form.values.isUseMbtiTypeData
        ? false
        : !form.values.title && !form.values.content; // personalities일 경우 조건

  const onSubmit = () => {
    if (type === "types") {
      closeModal([
        ...(form.values.mbtiType
          ? [{ field: "mbtiType", text: form.values.mbtiType }]
          : []),
        ...(form.values.subject
          ? [{ field: "subject", text: form.values.subject }]
          : []),
      ]);
    } else {
      closeModal([
        ...(form.values.isUseMbtiTypeData
          ? [
              {
                field: "mbtiType",
                text: `${form.values.mbtiTypeData.energy}${form.values.mbtiTypeData.awareness}${form.values.mbtiTypeData.judgement}${form.values.mbtiTypeData.life}`,
              },
            ]
          : []),
        ...(form.values.title
          ? [{ field: "title", text: form.values.title }]
          : []),
        ...(form.values.content
          ? [{ field: "content", text: form.values.content }]
          : []),
      ]);
    }
  };

  return (
    <Flex direction="column" w="16rem" gap="sm">
      {type === "types" && (
        <>
          <Select
            data={MBTI_TYPES_OPTIONS}
            placeholder="유형을 선택해 주세요."
            {...form.getInputProps("mbtiType")}
          />
          <TextInput
            placeholder="내용을 입력해 주세요."
            {...form.getInputProps("subject")}
          />
        </>
      )}
      {type === "personalities" && (
        <Flex direction="column" gap="sm">
          <Flex gap="sm">
            <SegmentedControl
              w="100%"
              data={["E", "I"]}
              {...form.getInputProps("mbtiTypeData.energy")}
            />
            <SegmentedControl
              w="100%"
              data={["S", "N"]}
              {...form.getInputProps("mbtiTypeData.awareness")}
            />
          </Flex>
          <Flex gap="sm">
            <SegmentedControl
              w="100%"
              data={["T", "F"]}
              {...form.getInputProps("mbtiTypeData.judgement")}
            />
            <SegmentedControl
              w="100%"
              data={["J", "P"]}
              {...form.getInputProps("mbtiTypeData.life")}
            />
          </Flex>
          <Checkbox
            label="MBTI 유형 검색 사용 여부"
            {...form.getInputProps("isUseMbtiTypeData")}
          />
          <TextInput
            placeholder="제목을 입력하세요."
            {...form.getInputProps("title")}
          />
          <TextInput
            placeholder="내용을 입력하세요."
            {...form.getInputProps("content")}
          />
        </Flex>
      )}
      <Button disabled={isButtonDisabled} onClick={() => onSubmit()}>
        등록
      </Button>
    </Flex>
  );
};
