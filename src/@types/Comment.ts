export interface CommentPost {
  _id: string;
  memoId: string;
  parentCommentId: string;
  nickName: string;
  content: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentLikeResponse {
  _id: string;
  nickName: string;
  likeCount: number;
}
