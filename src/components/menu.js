import React, { useState, useRef, useEffect } from "react";
import "./menu.css";
import Popup from "./Popup";
import { FaShoppingCart, FaFilter } from "react-icons/fa";

export const Menu = (props) => {
  const [isVisible, setVisibility] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const menuListRef = useRef(null);
  const containerRef = useRef(null);
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterCustomPrice, setFilterCustomPrice] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showInput, setShowInput] = useState(true);

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

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const createProduct = () => {
    fetch("http://localhost:3001/add_product", {
      method: "POST",
      body: JSON.stringify({ name, price, avatarUrl }), 
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log({ response });
        response.json().then((value) => {
          console.log({ value });
        });
        setName("");
        setPrice(0);
        setAvatarUrl(""); 
        setShowInput(true); 
        togglePopup();
        props.getProducts();
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsModalOpen(false);
      setIsMenuOpen(false);
      setIsCartModalOpen(false);
    }
  };

  const handleInputChange = (e) => {
    e.stopPropagation();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setAvatarUrl(imageUrl);
      setShowInput(false);
    };

    reader.readAsDataURL(file);
  };

  const applyFilters = () => {
    console.log("Applied filters:");
    console.log("Max Price:", filterMaxPrice);
    console.log("Min Price:", filterMinPrice);
    console.log("Custom Price:", filterCustomPrice);
  };

  return (
    <div className="menu__container" ref={containerRef}>
      <div className="menu__item">
        <button className="filter" onClick={toggleModal}>
          <FaFilter className="filter-icon" />
        </button>
        <button className="basket" onClick={toggleCartModal}>
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
          </ul>
        </div>
      )}

      {isOpen && (
        <Popup
          handleClose={togglePopup}
          content={
            <div className="container">
              <h2>Product</h2>
              <p>Create product</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onClick={handleInputChange}
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onClick={handleInputChange}
              />
              {showInput && ( 
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  onClick={handleInputChange}
                />
              )}
              {avatarUrl && (
                <img src={avatarUrl} alt="Product" className="avatar" />
              )}
              <button className="button_Create" onClick={createProduct}>
                Create
              </button>
            </div>
          }
        />
      )}

      {isModalOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="container">
            <h2>Filter Products</h2>
            <label>
              Max Price:
              <input
                type="text"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
                onClick={handleInputChange}
              />
            </label>
            <label>
              Min Price:
              <input
                type="text"
                value={filterMinPrice}
                onChange={(e) => setFilterMinPrice(e.target.value)}
                onClick={handleInputChange}
              />
            </label>
            <label>
              Custom Price:
              <input
                type="text"
                value={filterCustomPrice}
                onChange={(e) => setFilterCustomPrice(e.target.value)}
                onClick={handleInputChange}
              />
            </label>
            {/* <button onClick={applyFilters}>Apply</button> */}
          </div>
        </div>
      )}

      {isCartModalOpen && (
        <div className="modal" onClick={toggleCartModal}>
          <div className="container">
            <h2>Cart</h2>
          </div>
        </div>
      )}
    </div>
  );
};
