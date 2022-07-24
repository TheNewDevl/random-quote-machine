import { Link } from "@mui/material";
import { QuoteType } from "../utils/types";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useLang } from "../utils/hooks";

type ActionsProps = {
  quote: QuoteType;
  handleNewQuote: () => void;
};

function Actions({ quote, handleNewQuote }: ActionsProps) {
  const { text } = useLang();

  return (
    <div className="actions">
      <Link
        className="btn"
        href={`https://twitter.com/intent/tweet?text=${quote.text}-${quote.author}`}
        id="tweet-quote"
      >
        <TwitterIcon /> {text.tweetBtn}
      </Link>
      <a
        href="/"
        className="quote__btn"
        onClick={handleNewQuote}
        id="new-quote"
      >
        {text.newQuoteBtn}
      </a>
    </div>
  );
}

export default Actions;
