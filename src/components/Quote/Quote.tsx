import { useLang } from "../../utils/hooks";
import { QuoteType } from "../../utils/types";
import style from "./quote.module.css";

type QuoteProps = {
  quote: QuoteType;
  error: any;
};

function Quote({ error, quote }: QuoteProps) {
  const { text } = useLang();
  if (error) {
    return <p style={{ color: "#000" }}>{text.errorMsg}</p>;
  } else {
    return (
      <blockquote>
        <p id="text" className={style.text}>
          {error ? error : quote.text}
        </p>
        <address id="author" className={style.author}>
          - {quote.author}
        </address>
      </blockquote>
    );
  }
}

export default Quote;
