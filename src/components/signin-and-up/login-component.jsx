import React, { useState, useEffect } from "react";
import AppButton from "../app-small-components/app-button-component";
import AppInput from "../app-small-components/app-input-component";
import { connect } from "react-redux";
import { auth, signInWithGoogle } from "../../firebase/firebase-root";

const LoginWith = ({ user }) => {
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");

  useEffect(() => {}, [user]);

  const handleSignInEmail = async () => {
    try {
      auth.signInWithEmailAndPassword(newEmail, newPassword);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="app-form">
      <fieldset
        className="half-card"
        style={{ marginTop: 60, marginBottom: 40 }}
      >
        <AppButton
          toggleText="login with FaceBook"
          type="button"
          color="deepblue"
          size="large"
          disabled={true}
        />
        <br />
        <AppButton
          color="yellowgreen"
          size="large"
          toggleText=" login with Google"
          callFunc={() => signInWithGoogle()}
          type="button"
          theme="light"
        />
      </fieldset>
      <fieldset
        className="half-card"
        style={{ marginTop: 60, marginBottom: 40 }}
      >
        <AppInput
          type="email"
          getValue={newEmail || "enter email"}
          callFunc={(e) => setEmail(e.target.value)}
          color="seagreen"
        />
        <br />
        <AppInput
          type="password"
          getValue={newPassword || "Enter password"}
          callFunc={(e) => setPassword(e.target.value)}
          color="seagreen"
        />
        <br />
        <AppButton
          color="seagreen"
          toggleText="login with email"
          align="center"
          size="large"
          type="button"
          callFunc={() => handleSignInEmail()}
        />
      </fieldset>
    </form>
  );
};
const mapStateToProps = (state) => ({
  user: state.users,
});
export default connect(mapStateToProps)(LoginWith);
