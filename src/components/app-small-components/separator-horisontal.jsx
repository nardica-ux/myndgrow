import React from "react";

export default function HorizonatalSeparator({ color, percWidth }) {
  return (
    <div
      style={{
        backgroundColor: color,
        width: percWidth,
        content: "",
        height: 1,
        margin: `20px auto`,
      }}
    />
  );
}
