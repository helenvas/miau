export interface Breed {
  name: string;
  id: string;
}

export interface Category {
  name: string;
  id: number;
}

export interface CatImage {
  id: number;
  url: string;
  categories: [Category];
}