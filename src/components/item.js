import React, { useState, useEffect } from "react";
import "./item.css";
import PopupUpdata from "./PopupUpdata";
import { FaTrash, FaEdit, FaShoppingCart } from "react-icons/fa";


export const Item = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(props.imageUrl);


  const [originalAvatar, setOriginalAvatar] = useState(null);
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);


  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const updateProduct = () => {
    // Перевіряємо, чи відбулися зміни у фото
    if (avatar !== originalAvatar) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("id", props.id);
      formData.append("photo", avatar);

      fetch("https://gamepad-server.onrender.com/product_update", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          togglePopup();
          props.getProducts();
        })
        .catch((error) => console.log(error));
    } else {
      // Використовуємо оригінальне фото, якщо зміни не відбулися
      fetch("https://gamepad-server.onrender.com/product_update", {
        method: "POST",
        body: JSON.stringify({ name, price, id: props.id, avatar: originalAvatar }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          togglePopup();
          props.getProducts();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setAvatar(imageUrl);
      localStorage.setItem(`avatar-${props.id}`, imageUrl);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetValues = () => {
    setName(props.name);
    setPrice(props.price);
    setAvatar(props.imageUrl)
  };

  const resetImage = () => {
    setAvatar(originalAvatar);
    localStorage.setItem(`avatar-${props.id}`, originalAvatar);
  };


  const handleAddToCart = () => {
    console.log('Hello, Cart', { name }, { price });

  };


  return (
    <div className="block">
      <div className="block_row">
        <div className="block_column">
          <div className="block_item">
            <div className="card">
              <img src={avatar} alt="Photo" style={{ width: "100%" }} />

              <div className="container">
                <h4>
                  <b>{name}</b>
                </h4>
                <p>{`${price}₴`}</p>
              </div>
              <div className="button_container">
                <button
                  className="butoon_margin"
                  onClick={() => {
                    props.deleteProduct(props.id);
                  }}
                >
                  <FaTrash />
                </button>
                <button onClick={togglePopup}>
                  <FaEdit />
                </button>
                <button onClick={handleAddToCart}>
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <PopupUpdata
          handleClose={() => {
            togglePopup();
            resetValues();
            resetImage();
          }}
          content={
            <div className="popup_content">
              <h2>Update the product</h2>
              <p>This is sample content for my popup.</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name product"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price the product"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button className="buttonSave" onClick={updateProduct}>Save</button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Item;
