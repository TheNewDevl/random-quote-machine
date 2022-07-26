import type { NextPage } from "next";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { handleColors, updateQuote } from "../utils/funcs";
import { QuoteType } from "../utils/types";
import Quote from "../components/Quote/Quote";
import Actions from "../components/Actions/Actions";
import { useLang } from "../utils/hooks";
import Lang from "../components/Lang/Lang";
import { fetchData } from "../utils/funcs";
import { reverseRotateFn, rotateFn } from "../utils/anims";

const Home: NextPage = () => {
  const [frQuote, setFrQuote] = useState<QuoteType>({
    text: "",
    author: "",
  });
  const [quote, setQuote] = useState<QuoteType>({
    text: "",
    author: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const quoteBox = useRef(null);

  const { text, setLang, lang } = useLang();

  const quoteFn = () => {
    return lang === "fr" ? frQuote : quote;
  };

  useEffect(() => {
    setInterval(handleColors, 100);
    handleNewQuote(null, true);
  }, []);

  const handleNewQuote = async (e?: MouseEvent | null, first?: boolean) => {
    e && e.preventDefault();
    const rotate = rotateFn(quoteBox.current! as HTMLElement);
    const reverseRotate = reverseRotateFn(quoteBox.current! as HTMLElement);

    first ? reverseRotate.play() : rotate.play();
    rotate.onfinish = () => {
      reverseRotate.play();
    };
    try {
      const newQuote = await fetchData("https://api.quotable.io/random", "GET", setError);

      if (lang === "fr") {
        const body = newQuote.content;
        const translation = await fetchData("http://localhost:3000/api/tl", "POST", setError, body);
        setFrQuote({
          text: translation.text,
          author: newQuote.author,
        });
      }
      first
        ? updateQuote(newQuote, setQuote)
        : (rotate.onfinish = () => {
            reverseRotate.play();
            updateQuote(newQuote, setQuote);
          });
    } catch (err: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div ref={quoteBox} id="quote-box">
        <Lang quote={quote} frQuote={frQuote} setFrQuote={setFrQuote} setError={setError} />
        {isLoading ? <p>{text.loading}</p> : <Quote error={error} quote={quoteFn()} />}
        <Actions quote={quoteFn()} handleNewQuote={handleNewQuote} />
      </div>
      <p className="cr">{text.dev}</p>
    </div>
  );
};

export default Home;
