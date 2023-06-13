

import { useState, useRef, useEffect } from "react";
import "./menu.css";
import Popup from "./Popup";
import { FaShoppingCart, FaFilter } from "react-icons/fa";

export const Menu = (props) => {
  const [isVisible, setVisibility] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuListRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setMenuListHeight();
    window.addEventListener("resize", setMenuListHeight);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", setMenuListHeight);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const setMenuListHeight = () => {
    if (menuListRef.current) {
      const height = menuListRef.current.scrollHeight;
      menuListRef.current.style.height = `${height}px`;
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsModalOpen(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="menu__container" ref={containerRef}>
      <div className="menu__item">
        <button className="filter" onClick={toggleModal}>
          <FaFilter className="filter-icon" />
        </button>
        <button className="basket" onClick={toggleModal}>
          <FaShoppingCart className="basket-icon" />
        </button>
        
        <div className="menu">
          <button onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line" style={{ marginBottom: 0 }}></div>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu__list" ref={menuListRef}>
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

      {isModalOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="container">
            
          </div>
        </div>
      )}
    </div>
  );
};
