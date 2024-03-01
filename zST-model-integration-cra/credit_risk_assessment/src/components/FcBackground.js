import backgroundImage from "../background.svg";
import classes from "./FcBackground.module.scss";
export default function FcBackground() {
  return (
    <div className={classes.CalcBgContainer}>
      <img src={backgroundImage} alt="IBM" />
    </div>
  );
}
