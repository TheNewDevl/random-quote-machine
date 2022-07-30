import { CSSProperties } from "react";
import s from "./Loader.module.css";

type LoaderProps = {
  style?: CSSProperties;
};
/**
 * Basic loader component, used to show a loading animation. You can pass a style object to customize the loader.
 * @param style LoaderProps
 * @returns JSX.Element
 */
function Loader({ style }: LoaderProps) {
  return <div className={s.loader} style={style}></div>;
}

export default Loader;
