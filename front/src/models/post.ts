export interface IPost {
  id?: number,
  userId: number,
  title: string,
  content: string,
  pictureUrl: string,
  createdAt?:  number | string | Date,
  updatedAt?: string,
  deletedAt?: null | string
}

export interface ISinglePost {
  data: IPost
}

export interface IDataPost {
  data: IPost[]
}

export interface IPostForUpdate {
  title: string,
  content: string,
}

export interface ILike {
  id?: number,
  postId: number,
  userIdLiked: number,
  createdAt?:  number | string | Date,
  updatedAt?: string,
  deletedAt?: null | string
}

export interface IDataLike {
  data: ILike[]
}
