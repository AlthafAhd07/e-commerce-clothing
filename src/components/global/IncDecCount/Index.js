import React from "react";
import "./style.css";

const IncDecCounter = ({ ItemCount, setItemCount }) => {
  return (
    <div className="IncDecCounter">
      <button
        className="CartDecBtn"
        onClick={() =>
          setItemCount((old) => {
            if (old > 1) {
              return old - 1;
            }
            return old;
          })
        }
      >
        -
      </button>
      {ItemCount || 1}
      <button
        className="CartIncBtn"
        onClick={() =>
          setItemCount((old) => {
            return old + 1;
          })
        }
      >
        +
      </button>
    </div>
  );
};

export default IncDecCounter;
