import type { NextPage } from "next";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { handleColors, updateQuote, fetchData } from "../utils/funcs";
import { QuoteType } from "../utils/types";
import Quote from "../components/Quote/Quote";
import Actions from "../components/Actions/Actions";
import { useLang } from "../utils/hooks";
import Lang from "../components/Lang/Lang";
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
  const [isTranslated, setIsTranslated] = useState(false);
  const quoteBox = useRef(null);
  const { text, lang } = useLang();
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime: number = time - previousTimeRef.current;
      handleColors(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    handleNewQuote(null, true);

    return () => cancelAnimationFrame(requestRef.current as number);
  }, []);

  const quoteFn = () => {
    return lang === "fr" ? frQuote : quote;
  };

  const handleNewQuote = async (e?: MouseEvent | null, first?: boolean) => {
    setError(null);
    e && e.preventDefault();
    const rotate = rotateFn(quoteBox.current! as HTMLElement);
    const reverseRotate = reverseRotateFn(quoteBox.current! as HTMLElement);

    first ? reverseRotate.play() : rotate.play();

    rotate.onfinish = () => {
      reverseRotate.play();
    };
    try {
      const newQuote = await fetchData("https://api.quotable.io/random", "GET", setError);
      setIsTranslated(false);
      if (lang === "fr") {
        const body = newQuote.content;
        const translation = await fetchData("/api/tl", "POST", setError, body);
        setIsTranslated(true);
        setFrQuote({
          text: translation.text,
          author: newQuote.author,
        });
      }
      first
        ? updateQuote(newQuote, setQuote)
        : (rotate.onfinish = () => {
            setIsLoading(true);
            reverseRotate.play();
            updateQuote(newQuote, setQuote);
            setIsLoading(false);
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
        <Lang
          quote={quote}
          setFrQuote={setFrQuote}
          setError={setError}
          isTranslated={isTranslated}
          setIsTranslated={setIsTranslated}
        />
        {isLoading ? <p>{text.loading}</p> : <Quote error={error} quote={quoteFn()} />}
        <Actions quote={quoteFn()} handleNewQuote={handleNewQuote} />
      </div>
      <p className="cr">{text.dev}</p>
    </div>
  );
};

export default Home;
