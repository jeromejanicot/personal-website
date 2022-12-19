export interface MetaArticle {
  slug: string;
  title: string;
  publishedOn: Date;
}
export interface FMDataType {
  key: number;
  slug: string;
  title: string;
  publishedOn: string;
  preview: string;
}

export interface SlugItemType {
  content: string;
  data: FrontmatterFields;
  filePath: string;
}

export type KeyOfFieldType = keyof SlugItemType;

export interface FrontmatterFields {
  slug: string;
  title: string;
  date: number;
  publishedOn: string;
  preview: string;
  tags: Filters[];
}

export type Filters = "web" | "design" | "engineering";

export interface FilterType {
  page: number;
  perPage: number;
  date: boolean;
  filters: Array<Filters>;
  addTags: (input: Filters) => void;
  rmTags: (input: Filters) => void;
  setDate: (input: boolean) => void;
  setPage: (page: number) => void;
  increasePage: () => void;
  decreasePage: () => void;
  setPerPage: (perPage: number) => void;
}
