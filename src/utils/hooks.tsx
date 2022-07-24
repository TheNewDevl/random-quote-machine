import { createContext, PropsWithChildren, useContext, useState } from "react";
import { LangContextType, TextType, TextsType, Lang } from "./types";

const Context = createContext<LangContextType>({} as any);

export function useLang() {
  return useContext(Context);
}

const texts: TextsType = {
  en: {
    newQuoteBtn: "New quote",
    tweetBtn: "Share",
    title: "Random quotes",
    dev: "Coded by Carlos",
    loading: "Loading...",
  },
  fr: {
    newQuoteBtn: "Nouvelle citation",
    tweetBtn: "Partager",
    title: "Citations aléatoires",
    dev: "Développé par Carlos",
    loading: "Chargement...",
  },
};

export function LangContextProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<Lang>("en");

  const text: TextType = texts[lang];

  return (
    <Context.Provider value={{ lang, setLang, text }}>
      {children}
    </Context.Provider>
  );
}
