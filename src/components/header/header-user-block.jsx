import React from "react";
import { auth } from "../../firebase/firebase-root";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./header.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import AppButton from "../app-small-components/app-button-component";
import { refresh_entries_redux } from "../../redux/entry-actions";

const HeaderUserBlock = ({
  compact,
  user,
  refresh_entries_redux,
  startLogging,
  openParent,
  toggleOpenNav,
}) => {
  let history = useHistory();

  const loginButton = (
    <AppButton
      toggleText={user ? "LogOut" : "LogIn"}
      callFunc={() => {
        user ? auth.signOut() : startLogging(true);
      }}
    />
  );
  const userBlock = () => (
    <div className="header-block-mobile">
      <div>Hi, {user.displayName}</div>
      <AppButton
        toggleText=" Add Entry +"
        color={"yellowgreen"}
        theme="light"
        callFunc={() => history.push("/add-entry")}
      />

      {loginButton}
      <AppButton
        toggleText="reload"
        type="button"
        color="darkblue"
        callFunc={() => refresh_entries_redux(user)}
      />

      {compact ? (
        <CloseIcon
          className="material-icons"
          onClick={() => toggleOpenNav(false)}
          style={{ margin: "15px auto" }}
        />
      ) : null}
    </div>
  );

  return user ? (
    compact ? (
      openParent === "user" ? (
        userBlock()
      ) : (
        <AccountCircleIcon
          className="material-icons"
          fontSize="large"
          onClick={() => toggleOpenNav("user")}
          style={{ float: "right", width: 32, margin: 8 }}
        />
      )
    ) : (
      userBlock()
    )
  ) : (
    loginButton
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    refresh_entries_redux: (user) => dispatch(refresh_entries_redux(user)),
  };
};
export default connect(null, mapDispatchToProps)(HeaderUserBlock);
