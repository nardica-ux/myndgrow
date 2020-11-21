import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "./header.module.scss";
import { pages } from "../app/pages";
import HeaderNavBlock from "./header-nav-block";
import LogInGeneral from "../signin-and-up/login-general-component";
import AppModal from "../app-small-components/modal-component";
import HeaderStyleBlock from "./header-style-block";
import HeaderUserBlock from "./header-user-block";
import ErrorBoundary from "../error-boundary/error-boundary-component";

const Header = ({ user }) => {
  const [logging, startLogging] = useState(false);
  const [activePages, setNav] = useState([]);
  const [open, toggleOpenNav] = useState(false);
  const [activePage, setActive] = useState(window.location.pathname);
  const [compact, defineCompact] = useState(window.innerWidth < 801);
  let history = useHistory();

  const updateWindowDimensions = () => {
    if (window.innerWidth < 801) {
      defineCompact(true);
      toggleOpenNav(false);
    } else {
      defineCompact(false);
    }
  };
  const forLoggedOnly = ["add entry", "review category"];
  const activeNotLogged = ["about", "contact", "success stories"];

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [compact]);

  useEffect(() => {
    // window.addEventListener("resize", updateWindowDimensions);
    let nav = [];
    if (user) {
      nav = pages.filter((el) => !forLoggedOnly.includes(el.name));
    } else {
      nav = pages.filter((el) => activeNotLogged.includes(el.name));
    }
    setNav(nav);
    if (user && logging) {
      startLogging(false);
      history.push("/");
      setActive("/");
    }
    if (!user) {
      history.push("/about");
      setActive("/about");
    }
    // return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [user]);

  return (
    <header className={style.App_header}>
      <ErrorBoundary>
        <HeaderStyleBlock
          open={open}
          compact={compact}
          toggleOpenNav={toggleOpenNav}
        />
        <p className={style.test}>
          Env={process.env.REACT_APP_ENV}, build=
          {process.env.REACT_APP_BUILD_NUM}
        </p>

        {open === "user" ? null : (
          <HeaderNavBlock
            toggleOpenNav={toggleOpenNav}
            openParent={open}
            compact={compact}
            activePages={activePages}
            activePage={activePage}
            setActive={setActive}
          />
        )}
        {open === "nav" ? null : (
          <HeaderUserBlock
            toggleOpenNav={toggleOpenNav}
            openParent={open}
            compact={compact}
            user={user}
            startLogging={startLogging}
          />
        )}

        <AppModal open={logging} getmodalclosed={startLogging}>
          <LogInGeneral />
        </AppModal>
      </ErrorBoundary>
    </header>
  );
};

export default Header;
