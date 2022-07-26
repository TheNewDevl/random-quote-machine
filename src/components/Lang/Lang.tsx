import LanguageIcon from "@mui/icons-material/Language";
import { useEffect } from "react";
import { useLang } from "../../utils/hooks";
import { Lang, QuoteType } from "../../utils/types";
import style from "./Lang.module.css";
import { fetchData } from "../../utils/funcs";

type LangProps = {
  quote: QuoteType;
  setFrQuote: React.Dispatch<React.SetStateAction<QuoteType>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  frQuote: QuoteType;
};

function Lang({ quote, setFrQuote, setError, frQuote }: LangProps) {
  const { setLang, lang, text } = useLang();
  useEffect(() => {
    handleSlider(lang as Lang);
  }, []);

  const handleChoice = async (e: any) => {
    try {
      const targetLang = e.currentTarget.dataset.lang;
      handleSlider(targetLang);
      if (targetLang === "fr") {
        if (frQuote.text === "") {
          const translation = await fetchData(
            "http://localhost:3000/api/tl",
            "POST",
            setError,
            quote.text
          );
          setFrQuote({ text: translation.text, author: quote.author });
        }
        setLang(targetLang);
      } else if (targetLang === "en") {
        setLang(targetLang);
      }
    } catch (error) {
      handleSlider(lang as Lang);
      alert(text.alert);
    }
  };

  const handleToggleClass = (value: string) => {
    return lang === value ? `${style.toggle} ${style.active}` : style.toggle;
  };

  const handleSlider = (value: Lang) => {
    const slides = document.getElementById("slider");
    if (value === "en") {
      slides?.style.setProperty("left", "50%");
    } else if (value === "fr") {
      slides?.style.setProperty("left", "0");
    }
  };

  return (
    <div className={style.toggle__container}>
      <LanguageIcon />
      <div className={style.group}>
        <div id="slider" className={style.slider}></div>
        <div onClick={handleChoice} data-lang="fr" className={handleToggleClass("fr")}>
          FR
        </div>
        <div onClick={handleChoice} data-lang="en" className={handleToggleClass("en")}>
          EN
        </div>
      </div>
    </div>
  );
}
export default Lang;
