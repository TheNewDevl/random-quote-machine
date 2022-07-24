import { QuoteType } from "../utils/types";

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
        <p id="text">{error ? error : quote.text}</p>
        <address id="author">- {quote.author}</address>
      </blockquote>
    );
  }
}

export default Quote;
