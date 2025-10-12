export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: Date;
  imageUrl: string;
  category: string;
  tags: string[];
}