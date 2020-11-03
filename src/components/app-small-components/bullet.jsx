import React from "react";

export default function ColorBullet({ color, left = 5, right = 5 }) {
  return (
    <span
      style={{
        backgroundColor: color,
        display: "inline-block",
        marginLeft: left,
        marginRight: right,
        width: 10,
        height: 10,
        borderRadius: 20,
      }}
    />
  );
}
