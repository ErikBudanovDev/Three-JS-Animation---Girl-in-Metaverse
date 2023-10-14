import classes from "./Button.module.css";
import arrow from "../../UI/svgIcons/ButtonArrow.svg";
export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.button} ${props.className}`}
    >
      {props.children}
    </button>
  );
}
