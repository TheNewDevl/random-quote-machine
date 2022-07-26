export type QuoteType = {
  text: string;
  author: string;
};

export type ResponseType = {
  content: string;
  autor: string;
  author: string;
  authorSlug: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
  _id: string;
};

export type TextType = {
  newQuoteBtn: string;
  tweetBtn: string;
  title: string;
  dev: string;
  loading: string;
  langDiagTitle: string;
  lang1: string;
  lang2: string;
  alert: string;
};

export type TextsType = {
  fr: TextType;
  en: TextType;
};

export type Lang = "fr" | "en";

export type LangContextType = {
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
  text: TextType;
};
