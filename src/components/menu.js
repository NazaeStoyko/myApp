import { useState } from "react";
import "./menu.css";
import Popup from "./Popup";

export const Menu = (props) => {
  const [isVisible, setVisibility] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const createProduct = () => {
    fetch("http://localhost:3001/add_product", {
      method: "POST",
      body: JSON.stringify({ name, price }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log({ response });

      response.json().then((value) => {
        console.log({ value });
      });
      setName("");
      setPrice(0);
      togglePopup();
      props.getProducts();
    });
  };
  return (
    <div className="menu__container">
      <div className="menu__item">
        <button className="basket"></button>

        <div className="menu">
          <button onClick={toggleMenu}>
            {" "}
            {}
            <div className="line"></div>
            <div className="line"></div>
            <div className="line" style={{ marginBottom: 0 }}></div>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu__list">
          <ul>
            <li onClick={() => setVisibility(false)}>profile</li>
            <li>sign out</li>

            {props.isAdmin && (
              <button className="raise" onClick={togglePopup}>
                Create Product
              </button>
            )}

            {isOpen && (
              <Popup
                handleClose={togglePopup}
                content={
                  <div>
                    <h2>Title</h2>
                    <p>This is sample content for my popup.</p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <button onClick={createProduct}>Create</button>
                  </div>
                }
              />
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
