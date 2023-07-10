
import React, { useState, useRef, useEffect } from "react";
import "./menu.css";
import Popup from "./Popup";
import { FaShoppingCart, FaFilter } from "react-icons/fa";


export const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);

  const menuListRef = useRef(null);
  const containerRef = useRef(null);
  const modalRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const createProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("photo", photo);

    fetch("https://gamepad-server.glitch.me/add_product", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          togglePopup();
          setName("");
          setPrice(0);
          setPhoto(null);
          props.getProducts(); // Оновити дані у батьківському компоненті
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsModalOpen(false);
      setIsMenuOpen(false);
      setIsCartModalOpen(false);
    }
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleInputChange = (e) => {
    e.stopPropagation();
  };

  const handlePopupClose = () => {
    setIsOpen(false);
    setName("");
    setPrice(0);
    setPhoto(null);
  };

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu__container" ref={containerRef}>
      <div className="menu__item">
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
            <li onClick={() => setIsOpen(false)}>profile</li>
            <li>sign out</li>
            {props.isAdmin && (
              <button className="raise" onClick={() => setIsOpen(true)}>
                Create Product
              </button>
            )}
          </ul>
        </div>
      )}

      {isOpen && (
        <Popup
          handleClose={handlePopupClose}
          content={
            <div className="container">
              <h2>Product</h2>
              <p>Create product</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onClick={handleInputChange}
                placeholder="Name product"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onClick={handleInputChange}
                placeholder="Price the product"
              />
              <input type="file" onChange={handlePhotoChange} />
              <button className="button_Create" onClick={createProduct}>
                Create
              </button>
            </div>
          }
        />
      )}
      {isCartModalOpen && (
        <div className="modal" onClick={toggleCartModal} ref={modalRef}>
          <div className="container" onClick={handleModalClick}>
            <h2>Cart</h2>

            {/* Виводимо назву та ціну товару */}


          </div>
        </div>

      )}
    </div>
  );
};




