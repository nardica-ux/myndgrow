import React, { useRef } from "react";
import ReactDOM from "react-dom";
import AppButton from "../app-small-components/app-button-component";

const AppModal = (props) => {
  const { getmodalclosed, title, modalWidth } = props;
  const ref = useRef();

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
  });

  const handleClose = () => {
    setTimeout(() => {
      el.classList.remove("animate-closure");
      backdrop.classList.remove("animate-closure");
      getmodalclosed(false);
    }, 350);
    let el = document.getElementById("edit-group");
    let backdrop = document.querySelector(".popup-blur");
    backdrop.style.animation = "dissolve .6s forwards";
    el.classList.add("animate-closure");
  };

  return props.open
    ? ReactDOM.createPortal(
        <div
          className="popup-blur"
          onClick={(e) => {
            if (!ref.current.contains(e.target)) handleClose();
          }}
        >
          <div
            ref={ref}
            className="card-container"
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
