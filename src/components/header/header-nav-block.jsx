import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import ListIcon from "@material-ui/icons/List";
import CloseIcon from "@material-ui/icons/Close";

const HeaderNavBlock = ({
  activePages,
  compact,
  openParent,
  toggleOpenNav,
  activePage,
  setActive,
}) => {
  const mobileNav = (
    <div className="header-block-mobile">
      {activePages.map((el, i) => (
        <Link
          to={el.path}
          key={"link-" + i}
          onClick={() => setActive(el.path)}
          className={el.path === activePage ? "active" : null}
        >
          {el.name}
        </Link>
      ))}
      <CloseIcon
        style={{ margin: "auto", marginBottom: 25 }}
        className="material-icons"
        onClick={() => toggleOpenNav(false)}
      />
    </div>
  );

  const nav = () =>
    activePages.map((el, i) => (
      <Link
        to={el.path}
        key={"link-" + i}
        onClick={() => setActive(el.path)}
        className={el.path === activePage ? "active" : null}
      >
        {el.name}
      </Link>
    ));

  return compact ? (
    openParent === "nav" ? (
      mobileNav
    ) : (
      <ListIcon
        className="material-icons"
        fontSize="large"
        onClick={() => toggleOpenNav("nav")}
        style={{ float: "right", width: 32, margin: 8 }}
      />
    )
  ) : (
    nav()
  );
};

export default HeaderNavBlock;
