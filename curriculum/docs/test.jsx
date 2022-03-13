import React from "react";

export default function Vocab({ children }) {
  const [ word, def ] = children.split(":", 2);
  return (
    <div
      style={{
        backgroundColor: "orange",
        borderRadius: "2px",
        color: "#fff",
        padding: "0.2rem",
      }}
    >
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        {word}
        <p
          style={{
            fontWeight: "normal",
          }}
        >
          {def}
        </p>
      </span>
    </div>
  );
}
