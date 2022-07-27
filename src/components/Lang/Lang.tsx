import LanguageIcon from "@mui/icons-material/Language";
import { useEffect } from "react";
import { useLang } from "../../utils/hooks";
import { LangType, QuoteType } from "../../utils/types";
import style from "./Lang.module.css";
import { fetchData } from "../../utils/funcs";

type LangProps = {
  quote: QuoteType;
  setFrQuote: React.Dispatch<React.SetStateAction<QuoteType>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  isTranslated: boolean;
  setIsTranslated: React.Dispatch<React.SetStateAction<boolean>>;
};

function Lang({ quote, setFrQuote, setError, isTranslated, setIsTranslated }: LangProps) {
  const { setLang, lang, text } = useLang();
  useEffect(() => {
    handleSlider(lang as LangType);
  }, []);

  const handleChoice = async (e: any) => {
    try {
      const targetLang = e.currentTarget.dataset.lang;
      handleSlider(targetLang);
      if (targetLang === "fr") {
        if (!isTranslated) {
          const translation = await fetchData("/api/tl", "POST", setError, quote.text);
          setFrQuote({ text: translation.text, author: quote.author });
        }
        setLang(targetLang);
        setIsTranslated(true);
      } else if (targetLang === "en") {
        setLang(targetLang);
      }
    } catch (error) {
      handleSlider(lang as LangType);
      alert(text.alert);
    }
  };

  const handleToggleClass = (value: string) => {
    return lang === value ? `${style.toggle} ${style.active}` : style.toggle;
  };

  const handleSlider = (value: LangType) => {
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
