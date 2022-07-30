import { QuoteType } from "../../utils/types";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useLang } from "../../utils/hooks";
import style from "./Actions.module.css";
import Link from "next/link";

type ActionsProps = {
  quote: QuoteType;
  handleNewQuote: () => void;
};

function Actions({ quote, handleNewQuote }: ActionsProps) {
  const { text } = useLang();

  return (
    <div className={style.actions}>
      <a
        href={`https://twitter.com/intent/tweet?text=${quote.text}-${quote.author}`}
        id="tweet-quote"
        className={style.btn}
      >
        <TwitterIcon color="inherit" style={{ marginRight: "1rem" }} />
        {text.tweetBtn}
      </a>
      <Link href="/">
        <a onClick={handleNewQuote} className={style.btn} id="new-quote">
          {text.newQuoteBtn}
        </a>
      </Link>
    </div>
  );
}

export default Actions;
