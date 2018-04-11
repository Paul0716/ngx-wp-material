export interface  Post {
  id: number;
  status: string;
  title: string;
  content: string;
  author: string;
  type: string;
  slug: string;
  categories: number[];
}
