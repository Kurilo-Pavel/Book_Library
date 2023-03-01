import "./button.scss";
import {Fragment} from "react";

type ButtonProps = {
  buttonType: "button" | "submit" | "reset";
  buttonClass: string;
  buttonClick: () => void;
  buttonName: string;
  buttonImage?: string;
  imageClass?: string;

}
const Button = ({buttonImage, buttonClass, buttonClick, imageClass, buttonType, buttonName}: ButtonProps) => {
  return (
    <Fragment>
      <button
        type={buttonType}
        className={buttonClass}
        onClick={buttonClick}
      >
        {buttonImage && <img src={buttonImage} alt="icon" className={imageClass}/>}
        {buttonName}
      </button>
    </Fragment>
  );
};

export default Button;