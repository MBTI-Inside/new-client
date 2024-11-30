import { CommonResponse } from '.';

export type MBTIType = 'energy' | 'awareness' | 'judgement' | 'life';

export interface Question extends CommonResponse {
  subject: string;
  answer: Answer[];
  mbtiType: MBTIType;
}

export interface Answer {
  type: string;
  content: string;
  proportion: number;
}

export interface MBTIProportion {
  type: string;
  rate: number;
}

export interface MBTIProportions {
  energy: MBTIProportion[];
  awareness: MBTIProportion[];
  judgement: MBTIProportion[];
  life: MBTIProportion[];
}
