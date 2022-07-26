import { Link } from "@mui/material";
import { QuoteType } from "../../utils/types";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useLang } from "../../utils/hooks";
import style from "./Actions.module.css";

type ActionsProps = {
  quote: QuoteType;
  handleNewQuote: () => void;
};

function Actions({ quote, handleNewQuote }: ActionsProps) {
  const { text } = useLang();

  return (
    <div className={style.actions}>
      <Link
        href={`https://twitter.com/intent/tweet?text=${quote.text}-${quote.author}`}
        id="tweet-quote"
        className={style.btn}
      >
        <TwitterIcon color="inherit" style={{ marginRight: "1rem" }} />
        {text.tweetBtn}
      </Link>
      <a href="/" className={style.btn} onClick={handleNewQuote} id="new-quote">
        {text.newQuoteBtn}
      </a>
    </div>
  );
}

export default Actions;
