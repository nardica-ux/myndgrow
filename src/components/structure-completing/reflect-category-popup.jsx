import React, { useState } from "react";
import { connect } from "react-redux";
import AppButton from "../app-small-components/app-button-component";
import AppInput from "../app-small-components/app-input-component";

const ReflectCategoryForm = ({ group, editGroup, user }) => {
  const [isPublic, setPublic] = useState(false);
  const [onCategory, reflectOnCategory] = useState("");
  const [onGoal, reflectOnGoal] = useState("");
  const [onQuestion, reflectOnQuestion] = useState("");
  const [onJourney, reflectOnJourney] = useState("");

  const handleComplete = () => {
    const obj = {
      name: user.displayName,
      author_id: user.own_id,
      ava: user.ava || "",
      published: isPublic,
      //   story: storyChuncks,
      img: "",
      //   diagram: diagramInfo(results),
      //   comments: results.map((el) => el.text),
      reactions: [],
    };
    console.log(obj);
  };
  return (
    <div>
      <form className="app-form">
        <AppInput
          name="your-thoughts-on-this-project"
          getValue={onCategory}
          callFunc={(e) => reflectOnCategory(e.target.value)}
        />
        <AppInput
          name="reflect-on-goal-set"
          getValue={onGoal}
          callFunc={(e) => reflectOnGoal(e.target.value)}
        />
        <AppInput
          name="do-you-have-the-answer-now?"
          getValue={onQuestion}
          callFunc={(e) => reflectOnQuestion(e.target.value)}
        />
        <AppInput
          name="how-was-the-journey?"
          getValue={onGoal}
          callFunc={(e) => reflectOnGoal(e.target.value)}
        />
      </form>
      <AppButton
        color={"royalblue"}
        callFunc={() => editGroup({ ...group, status: "startcomplete" })}
        toggleText={"to Review"}
        styleObj={{ float: "left" }}
      />
      <AppButton
        color={"tomato"}
        callFunc={() => handleComplete()}
        toggleText={"Submit Review"}
        styleObj={{ float: "right" }}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(ReflectCategoryForm);
