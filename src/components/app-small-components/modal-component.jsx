import React, { useRef } from "react";

import app_class from "../app/App.module.scss";
import ReactDOM from "react-dom";
import AppButton from "../app-small-components/app-button-component";
import modal_class from "./modal.module.scss";

const AppModal = (props) => {
  const { getmodalclosed, title, modalWidth = "70%" } = props;
  const ref = useRef();

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
  });

  const handleClose = () => {
    setTimeout(() => {
      el.classList.remove(app_class.animate_closure);
      backdrop.style.animation = "none";
      getmodalclosed(false);
    }, 550);
    let el = document.getElementById("edit-group");
    let backdrop = document.getElementById("backdrop");
    backdrop.style.animation = "dissolve .6s forwards";
    el.classList.add(app_class.animate_closure);
  };

  return props.open
    ? ReactDOM.createPortal(
        <div
          className={modal_class.popup_blur}
          id={"backdrop"}
          onClick={(e) => {
            if (!ref.current.contains(e.target)) handleClose();
          }}
        >
          <div
            ref={ref}
            className={app_class.card_container}
            style={{ maxWidth: modalWidth, flexWrap: "wrap" }}
            id="edit-group"
          >
            <div>
              {title ? <h3>{title}</h3> : null}
              <AppButton
                type="button"
                callFunc={() => handleClose()}
                toggleText="close"
                position="absolute"
                styleObj={{ top: 10, right: 15 }}
              />
            </div>
            {childrenWithProps}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AppModal;
