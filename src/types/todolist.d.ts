export interface addPost {
  postId: string;
  userId: string;
  title: string;
  description: string;
  status: boolean;
  [string: unknown]: unknown;
}

export interface modifyPost {
  postId: string;
  userId: string;
  title: string?;
  description: string?;
  status: boolean?;
  [string: unknown]: unknown;
}
