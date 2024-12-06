type MBTITypesOption = "energy" | "awareness" | "judgement" | "life";
export type MBTIDatasOption = {
  energy: string[];
  awareness: string[];
  judgement: string[];
  life: string[];
};

export const MBTI_TYPES_OPTIONS: MBTITypesOption[] = [
  "energy",
  "awareness",
  "judgement",
  "life",
];

export const MBTI_OPTIONS_DATA: MBTIDatasOption = {
  energy: ["E", "I"],
  awareness: ["N", "S"],
  judgement: ["T", "F"],
  life: ["P", "J"],
};

export const MBTI_TYPES_VALUE = {
  energy: "에너지",
  awareness: "인식",
  judgement: "본성",
  life: "전술",
};
