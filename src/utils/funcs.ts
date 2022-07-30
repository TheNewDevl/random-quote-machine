import React from "react";
import { QuoteType, ResponseType } from "./types";

export const updateQuote = async (
  data: ResponseType,
  setQuote: React.Dispatch<React.SetStateAction<QuoteType>>
) => {
  setQuote({
    text: data.content,
    author: data.author,
  });
};

export const handleColors = (delta: number) => {
  const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
  document.documentElement.style.setProperty("--hue", String(hue + delta * 0.01));
};

export const setDocumentTitle = (title: string) => {
  document.title = title;
};

export const fetchData = async (
  uri: string,
  method: string,
  setError: React.Dispatch<React.SetStateAction<null>>,
  body?: BodyInit
) => {
  try {
    const res = await fetch(uri, {
      method,
      body,
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Error fetching data");
    }
  } catch (error: any) {
    setError(error);
  }
};
