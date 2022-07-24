import { MouseEvent, useEffect, useRef, useState } from "react";
import { animationEnd, animElement, updateQuote } from "./utils/funcs";
import { QuoteType } from "./utils/types";
import Quote from "./components/Quote";
import Actions from "./components/Actions";
import { useLang } from "./utils/hooks";

function App() {
  const [quote, setQuote] = useState<QuoteType>({
    text: "",
    author: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const quoteBox = useRef(null);

  const { text, setLang } = useLang();

  useEffect(() => {
    //handleNewQuote(null, true);
  }, []);

  const handleNewQuote = async (e?: MouseEvent | null, first?: boolean) => {
    e && e.preventDefault();
    const element = quoteBox.current!!;

    setLang((lang) => (lang === "en" ? "fr" : "en"));

    first
      ? animElement(element, "reverse-anim")
      : animElement(element, "anim", "reverse-anim");

    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = response.ok && (await response.json());
      first
        ? updateQuote(data, setQuote)
        : animationEnd(element, "anim", () => updateQuote(data, setQuote));
    } catch (e: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslation = async () => {
    try {
    } catch (error) {}
  };
  return (
    <div className="App">
      <div ref={quoteBox} id="quote-box">
        {isLoading ? (
          <p>{text.loading}</p>
        ) : (
          <Quote error={error} quote={quote} />
        )}
        <Actions quote={quote} handleNewQuote={handleNewQuote} />
        <p className="cr">{text.dev}</p>
      </div>
    </div>
  );
}

export default App;
