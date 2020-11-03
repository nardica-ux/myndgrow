import React, { useState } from "react";
import SignUpWithAuth from "./signup-with-auth";
import LoginWith from "./login-component";
import AppButton from "../app-small-components/app-button-component";
import "./sign-in.scss";

const LogInGeneral = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <h3>
        {active ? "Create new account" : "Log into your existing account"}
      </h3>

      {active ? <SignUpWithAuth /> : <LoginWith />}

      <span style={{ marginLeft: "auto" }}>
        {active ? "Already have the account" : "No Account yet"}? Switch to{" "}
      </span>
      <AppButton
        callFunc={() => setActive(!active)}
        styleObj={{ margLeft: 30 }}
        toggleText={active ? "SignIn" : "SignUp"}
        color="tomato"
      />
    </>
  );
};
export default LogInGeneral;
