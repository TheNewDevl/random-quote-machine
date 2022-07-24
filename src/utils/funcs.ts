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

export const animationEnd = (
  el: HTMLElement,
  anim: string,
  cb?: () => void
) => {
  const event = "animationend";

  el.addEventListener(event, (e) => {
    e.animationName === anim && el.classList.remove(anim);
    cb && cb();
  });
};

export const animElement = (el: HTMLElement, anim: string, anim2?: string) => {
  if (!el) {
    throw new Error("Element is undefined, can't set animation");
  }

  el.classList.add(anim);

  if (anim2) {
    animationEnd(el, anim, () => el.classList.add(anim2));
    animationEnd(el, anim2);
  } else {
    animationEnd(el, anim);
  }
};

export const handleColors = () => {
  let hue = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--hue")
  );
  hue += 0.1;
  console.log(hue);

  document.documentElement.style.setProperty("--hue", hue.toString());
};

export const setDocumentTitle = (title: string) => {
  document.title = title;
};

export const preventDefault = (e: React.MouseEvent) => {
  e.preventDefault();
};
