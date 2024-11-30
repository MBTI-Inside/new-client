import { CommonResponse } from '.';

export interface Fit {
  type: string;
  mbti: string;
  targetMbti: string;
  description: string;
}

export interface MBTI extends CommonResponse {
  type: string;
  summary: string;
  content: string;
  tags: string[];
  fit: Fit[];
  count: number;
}
