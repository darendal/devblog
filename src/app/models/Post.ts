export interface Post {
  id: number;
  title: string;
  publishDate: Date;
  path: string;
}

export const posts: Post[] = [
  {id: 0, title: 'Writing a TAR util - 0', path: './assets/posts/rauTo-part0.md', publishDate: new Date()}
];
