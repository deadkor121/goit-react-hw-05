import clsx from "clsx";
import style from "./ErrorMessege.module.css";

const ErrorMessege = () => {
  return (
    <div className={clsx(style.errorContainer)}>
      <p className={clsx(style.errorText)}>
        Sorry, we couldn&apos;t find any movies for your request❗ Please try
        again 😅
      </p>
    </div>
  );
};

export default ErrorMessege;
