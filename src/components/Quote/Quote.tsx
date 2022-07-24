import { QuoteType } from "../../utils/types";
import style from "./quote.module.css";

type QuoteProps = {
  quote: QuoteType;
  error: any;
};

function Quote({ error, quote }: QuoteProps) {
  if (error) {
    return <p>{`${error}`}</p>;
  } else {
    return (
      <blockquote>
        <p id={style.text}>{error ? error : quote.text}</p>
        <address id={style.author}>- {quote.author}</address>
      </blockquote>
    );
  }
}

export default Quote;
