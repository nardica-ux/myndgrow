import React, { useState } from "react";
import AppButton from "../app-small-components/app-button-component";
import AppInput from "../app-small-components/app-input-component";

import {
  auth,
  signInWithGoogle,
  createUserProfileDocument,
} from "../../firebase/firebase-root";
import { set_user } from "../../redux/user/user-actions";

const SignUpWithAuth = () => {
  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [checkPassword, setPassCheck] = useState("");
  const [passColor, setPassColor] = useState("grey");

  const handleSignUpEmail = async () => {
    if (newPassword !== checkPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        newEmail,
        newPassword
      );
      let newUser = await createUserProfileDocument(user, {
        displayName: newName,
      });
      let userData = await newUser.get();
      setPassword("");
      setEmail("");
      setName("");
      setPassCheck("");
      set_user(userData());
    } catch (err) {
      alert(err.message);
    }
  };
  const handleCheck = async (e) => {
    setPassCheck(e.target.value);
    setPassColor(newPassword === e.target.value ? "royalblue" : "tomato");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="app-form">
      <div className="half-card">
        <AppButton
          callFunc={() => signInWithGoogle()}
          toggleText={"signUp with Google"}
          color={"yellowgreen"}
          size="large"
          theme="light"
          type="button"
          styleObj={{ margin: "auto" }}
        />
      </div>
      <div className="half-card">
        <p> Sign UP with Email </p>

        <AppInput
          getValue={newName}
          placeHolder={"enter your name"}
          callFunc={(e) => setName(e.target.value)}
          color={"royalblue"}
        />
        <AppInput
          getValue={newEmail}
          placeHolder={"enter your email"}
          type="email"
          callFunc={(e) => setEmail(e.target.value)}
          color={"royalblue"}
        />
        <AppInput
          getValue={newPassword}
          placeHolder={"enter the password"}
          type="password"
          callFunc={(e) => setPassword(e.target.value)}
          color={"royalblue"}
        />
        <AppInput
          type="password"
          getValue={checkPassword}
          placeHolder={"repeat the password"}
          callFunc={(e) => handleCheck(e)}
          color={passColor}
        />
        <br />
        <AppButton
          toggleText="Sign Up"
          size="large"
          type="button"
          callFunc={() => handleSignUpEmail()}
        />
      </div>
    </form>
  );
};

export default SignUpWithAuth;
