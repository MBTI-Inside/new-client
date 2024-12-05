export interface MemoPost {
  _id: string;
  title: string;
  content: string;
  nickName: string;
  mbtiType: string;
  cardColor: string;
  likeCount: number;
  cmtCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoLikeResponse {
  _id: string;
  likeCount: number;
}
