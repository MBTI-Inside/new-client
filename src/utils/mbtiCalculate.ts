import { MBTIProportion, MBTIProportions } from "@/@types/Question";
import { MBTI_TYPES_OPTIONS } from "@/constants/MBTIOptions";

import { MBTITypeAnswer } from "@/pages/Test";

import { MBTIDatasOption, MBTI_OPTIONS_DATA } from "@/constants/MBTIOptions";

// 비율을 계산하는 함수
const calculateRate = (value1: number, value2: number) => {
  return (value1 / (value1 + value2)) * 100;
};

// 유형별로 비율을 정렬하는 함수
const sortByRate = (a: { rate: number }, b: { rate: number }) =>
  b.rate - a.rate;

// 랜덤으로 선택하는 함수
const getRandomType = (type1: MBTIProportion, type2: MBTIProportion) => {
  return Math.random() > 0.5 ? type1 : type2;
};

// 카테고리별 비율을 저장할 객체 자동 생성
const mbtiScores = MBTI_TYPES_OPTIONS.reduce(
  (acc, type) => {
    acc[type] = MBTI_OPTIONS_DATA[type].reduce(
      (subAcc, option) => {
        subAcc[option] = 0; // 각 옵션에 대해 0으로 초기화
        return subAcc;
      },
      {} as Record<string, number>
    );
    return acc;
  },
  {} as Record<keyof MBTIDatasOption, Record<string, number>>
);

// 각 MBTI 유형의 비율을 카테고리별로 계산하는 함수
export const calculateMbtiProportion = (answers: MBTITypeAnswer[]) => {
  // 각 답변을 순회하며 유형별 proportion을 계산
  answers.forEach(({ mbtiType, type, proportion }) => {
    if (mbtiType in mbtiScores && type in mbtiScores[mbtiType]) {
      mbtiScores[mbtiType][type] += proportion;
    }
  });

  // 각 유형의 비율을 두 항목(E/I, S/N, T/F, J/P) 값을 더한 값으로 나누고, 높은 값을 첫 번째 요소로 정렬
  const mbtiProportions = {
    energy: [
      {
        type: "E",
        rate: calculateRate(mbtiScores.energy.E, mbtiScores.energy.I),
      },
      {
        type: "I",
        rate: calculateRate(mbtiScores.energy.I, mbtiScores.energy.E),
      },
    ].sort(sortByRate),

    awareness: [
      {
        type: "S",
        rate: calculateRate(mbtiScores.awareness.S, mbtiScores.awareness.N),
      },
      {
        type: "N",
        rate: calculateRate(mbtiScores.awareness.N, mbtiScores.awareness.S),
      },
    ].sort(sortByRate),

    judgement: [
      {
        type: "T",
        rate: calculateRate(mbtiScores.judgement.T, mbtiScores.judgement.F),
      },
      {
        type: "F",
        rate: calculateRate(mbtiScores.judgement.F, mbtiScores.judgement.T),
      },
    ].sort(sortByRate),

    life: [
      { type: "J", rate: calculateRate(mbtiScores.life.J, mbtiScores.life.P) },
      { type: "P", rate: calculateRate(mbtiScores.life.P, mbtiScores.life.J) },
    ].sort(sortByRate),
  };

  return mbtiProportions;
};

// MBTI 유형을 도출하는 함수
export const determineMBTI = (mbtiProportions: MBTIProportions) => {
  // 각 카테고리에서 가장 높은 비율의 type을 선택 (비율이 같을 경우 랜덤 선택)
  const energyType = mbtiProportions.energy.reduce((prev, curr) => {
    return prev.rate > curr.rate
      ? prev
      : prev.rate < curr.rate
        ? curr
        : getRandomType(prev, curr); // 50:50 비율일 경우 랜덤 선택
  }).type;

  const awarenessType = mbtiProportions.awareness.reduce((prev, curr) => {
    return prev.rate > curr.rate
      ? prev
      : prev.rate < curr.rate
        ? curr
        : getRandomType(prev, curr); // 50:50 비율일 경우 랜덤 선택
  }).type;

  const judgementType = mbtiProportions.judgement.reduce((prev, curr) => {
    return prev.rate > curr.rate
      ? prev
      : prev.rate < curr.rate
        ? curr
        : getRandomType(prev, curr); // 50:50 비율일 경우 랜덤 선택
  }).type;

  const lifeType = mbtiProportions.life.reduce((prev, curr) => {
    return prev.rate > curr.rate
      ? prev
      : prev.rate < curr.rate
        ? curr
        : getRandomType(prev, curr); // 50:50 비율일 경우 랜덤 선택
  }).type;

  // 최종 MBTI 유형 조합
  const mbtiType = `${energyType}${awarenessType}${judgementType}${lifeType}`;

  return mbtiType;
};
