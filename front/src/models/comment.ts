export interface IComment {
  id?: number,
  postId: number,
  userId: number,
  content: string,
  createdAt?:  number | string | Date,
  updatedAt?: string,
  deletedAt?: null | string
}

export interface ISingleComment {
  data: IComment
}

export interface IDataComment {
  data: IComment[]
}

export interface ICommentForUpdate {
  content: string,
}
