import { themeColor } from "@/styles/color";

/**
 * 작성자명 : 원종석
 * 작성일자 : 2024.12.05 (목)
 * 작성내용 : 특정 색상이 포함된 색상 배열을 찾아 반환합니다.
 * @param color 검색할 색상 값 (예: "#228BE6")
 * @returns 주어진 색상이 포함된 색상 배열 (찾지 못한 경우 undefined 반환)
 */
export const findColorArray = (
  color: string | undefined
): readonly string[] | undefined => {
  if (!color) return undefined;
  // themeColor 객체의 각 항목을 순회합니다.
  for (const [_, shades] of Object.entries(themeColor)) {
    // 주어진 색상이 현재 색상 배열(shades)에 포함되어 있는지 확인합니다.
    if (shades.includes(color)) {
      return shades; // 일치하는 색상 배열을 반환합니다.
    }
  }
  return undefined; // 일치하는 색상을 찾지 못한 경우 undefined를 반환합니다.
};
