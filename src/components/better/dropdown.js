import React, { useState, useRef, useEffect } from "react";
import uuid from "uuid";

import "./dropdown.scss";

const Dropdown = ({ activatorText = "Dropdown", items = [] }) => {
  const activatorRef = useRef(null);
  const listRef = useRef(null);
  const [isOpen, updateOpen] = useState(false);

  const clickHandler = evt => {
    if (!isOpen) {
      updateOpen(true);
    } else {
      updateOpen(false);
    }
  };

  const keyHandler = evt => {
    const code = evt.code ? evt.code : evt.keyCode;
    if (code === 27 && isOpen) {
      updateOpen(false);
    }
  };

  const clickOutsideHandler = evt => {
    // will tell you what you clicked on
    if (
      listRef.current.contains(evt.target) ||
      activatorRef.current.contains(evt.target)
    ) {
      return;
    }

    updateOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      listRef.current.querySelector("a").focus();
      document.addEventListener("mousedown", clickOutsideHandler);
    } else {
      document.removeEventListener("mousedown", clickOutsideHandler);
    }
  }, [isOpen]);

  return (
    <div className="dropdown-wrap" onKeyUp={keyHandler}>
      <button
        className="dropdown-activator"
        ref={activatorRef}
        onClick={clickHandler}
        aria-haspopup="true"
        aria-controls="dropdown1"
      >
        {activatorText}
      </button>
      <ul
        id="dropdown1"
        className={`dropdown-itemList ${isOpen ? "active" : ""}`}
        ref={listRef}
      >
        {items.map((val, index) => {
          return (
            <li key={index}>
              <a href={val.url}>{val.text}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Dropdown;
