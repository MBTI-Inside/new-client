type MBTIElementOption = "E" | "I" | "N" | "S" | "T" | "F" | "J" | "P";
type MBTITypesOption = "energy" | "awareness" | "judgement" | "life";
export type MBTIDatasOption = {
  energy: string[];
  awareness: string[];
  judgement: string[];
  life: string[];
};

export const MBTI_ELEMENT_OPTIONS: MBTIElementOption[] = [
  "E",
  "I",
  "N",
  "S",
  "T",
  "F",
  "J",
  "P",
];

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
  energy: { label: "에너지", color: "#EF4444" },
  awareness: { label: "인식", color: "#F97315" },
  judgement: { label: "본성", color: "#21C552" },
  life: { label: "전술", color: "#A755F7" },
};
