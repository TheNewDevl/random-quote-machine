import { createContext, PropsWithChildren, useContext, useState } from "react";
import { LangContextType, TextType, TextsType, LangType } from "./types";

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
    langDiagTitle: "Select your language",
    lang1: "English",
    lang2: "French",
    alert: "Oops, language currently unavailable",
  },
  fr: {
    newQuoteBtn: "Nouvelle citation",
    tweetBtn: "Partager",
    title: "Citations aléatoires",
    dev: "Développé par Carlos",
    loading: "Chargement...",
    langDiagTitle: "Choisissez votre langue",
    lang1: "Anglais",
    lang2: "Français",
    alert: "Oups, Langue indisponible",
  },
};

export function LangContextProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<LangType>("en");

  const text: TextType = texts[lang];

  return <Context.Provider value={{ lang, setLang, text }}>{children}</Context.Provider>;
}
