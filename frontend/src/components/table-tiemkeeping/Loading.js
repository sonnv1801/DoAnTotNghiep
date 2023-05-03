import React from "react";

export const LoadingStaff = () => {
  return (
    <div>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span
        style={{
          color: "red",
          marginLeft: "1rem",
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        Loading...
      </span>
    </div>
  );
};
