export type MBTIType = "energy" | "awareness" | "judgement" | "life";

export interface Question {
  _id: string;
  subject: string;
  answer: Answer[];
  mbtiType: MBTIType;
  createdAt: string;
  updatedAt: string;
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
