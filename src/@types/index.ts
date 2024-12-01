import { Fit, MBTI } from "@/@types/MBTI";
import { MemoPost, MemoLikeResponse } from "@/@types/Memo";
import { CommentPost, CommentLikeResponse } from "@/@types/Comment";
import {
  MBTIProportion,
  MBTIProportions,
  MBTIType,
  Question,
} from "@/@types/Question";

export interface CommonResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type {
  CommentPost,
  CommentLikeResponse,
  MemoPost,
  MemoLikeResponse,
  Question,
  MBTIProportions,
  MBTIProportion,
  MBTI,
  MBTIType,
  Fit,
};
