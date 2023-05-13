import { useState } from "react";
import "./menu.css";

export const Menu = (props) => {
  const [isVisible, setVisibility] = useState(false);
  return (
    <div className="menu__container">
      <div className="menu__item">
        <div className="menu">
          <button
            onClick={() => {
              setVisibility(true);
            }}
          >
            Menu
          </button>
        </div>
      </div>
      {isVisible && (
        <div className="menu__list">
          <ul>
            <li
              onClick={() => {
                setVisibility(false);
              }}
            >
              profile
            </li>
            <li>sign out</li>
          </ul>
        </div>
      )}
    </div>
  );
};
