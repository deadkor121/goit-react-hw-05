import { NavLink } from "react-router-dom";
import clsx from "clsx";

import style from "./HeaderBox.module.css";

const HeaderBox = () => {
  const getNavLinkClassName = ({ isActive }) =>
    clsx(style.headerList, {
      [style.active]: isActive,
    });

  return (
    <header className={clsx(style.header)}>
      <nav className={clsx(style.headerNav)}>
        <NavLink className={getNavLinkClassName} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassName} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default HeaderBox;
