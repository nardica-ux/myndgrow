import React, { useState } from "react";
import "../structure-container/structure.scss";
import { connect } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { add_category } from "../../redux/categories/category-actions";
import ColorSelect from "./color-picker-select";
import AppButton from "../app-small-components/app-button-component";
import { update_category_start } from "../../redux/categories/category-actions";
import AppInput from "../app-small-components/app-input-component";
import "./structure-edit.scss";

const EditStructure = ({
  categories,
  add_category,
  user,
  update_category_start,
  editGroup,
}) => {
  const [startNewCat, setStart] = useState(false);
  const [newCat, setAddNew] = useState("");
  const [catColor, setCatColor] = useState("skyblue");
  const [catDetails, setDetails] = useState({
    goal: "",
    question: "",
  });

  if (!categories) return;
  const handleAddNew = async () => {
    let newobj = await add_category({
      name: newCat,
      goal: catDetails.goal,
      question: catDetails.question,
      user_id: user.own_id,
      color: catColor,
    });
    if (newobj) {
      setCatColor("skyblue");
      setDetails({
        goal: "",
        question: "",
      });
      setAddNew("");
    }
  };
  const updateColor = async (color, id) => {
    let cat = categories.find((el) => el.own_id === id);
    await update_category_start({ ...cat, color });
  };

  const content = categories.map((el, i) => (
    <li key={el.name + "-structure"} className="category-chip">
      <ColorSelect
        activeColor={el.color}
        name={el.name}
        id={el.own_id}
        setColor={updateColor}
      />
      <span
        style={{ color: el.color }}
        onClick={() => editGroup(categories[i])}
      >
        {el.name}
      </span>
      <DeleteOutlineIcon
        htmlColor={el.color}
        fontSize="small"
        className="materail-icons"
        style={{ marginRight: 16 }}
        onClick={() => console.log(el)}
      />
    </li>
  ));

  const addNew = (
    <fieldset style={{ display: "flex", flexDirection: "column" }}>
      {startNewCat ? (
        <ColorSelect
          activeColor={catColor}
          setColor={setCatColor}
          name={newCat}
        />
      ) : null}
      <AppInput
        value={"add new"}
        color={catColor}
        getValue={newCat}
        callFunc={(e) => setAddNew(e.target.value)}
      />

      {startNewCat ? (
        <div>
          <label htmlFor="goal"> Goal </label>
          <br />
          <AppInput
            callFunc={(e) =>
              setDetails({
                question: catDetails.question,
                goal: e.target.value,
              })
            }
            getValue={catDetails.goal}
            color={catColor}
          />
          <label htmlFor="question"> Question </label>
          <br />
          <AppInput
            callFunc={(e) =>
              setDetails({ goal: catDetails.goal, question: e.target.value })
            }
            getValue={catDetails.question}
            color={catColor}
          />
        </div>
      ) : null}
      {startNewCat ? (
        <div>
          <AppButton
            toggleText="cancel"
            color={"grey"}
            callFunc={() => setStart(false)}
          />
          <AppButton
            toggleText="add category"
            color={catColor}
            callFunc={async () => handleAddNew()}
          />
        </div>
      ) : (
        <AppButton
          color={catColor}
          toggleText="init"
          callFunc={() =>
            newCat.length > 5 ? setStart(true) : alert("enter valid name")
          }
        />
      )}
    </fieldset>
  );

  return (
    <form className="app-form">
      <p style={{ width: "100%", margin: "0 auto", fontSize: 12 }}>
        here you can add/delete or change a color for a category
      </p>
      {content}
      {addNew}
      <div style={{ width: "100%" }}>
        <AppButton toggleText="Submit" styleObj={{ float: "right" }} />
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_category: (obj) => dispatch(add_category(obj)),
    update_category_start: (obj) => dispatch(update_category_start(obj)),
  };
};
const mapStateToProps = (state) => ({
  user: state.user.user,
  categories: state.categories.categories,
});
export default connect(mapStateToProps, mapDispatchToProps)(EditStructure);
