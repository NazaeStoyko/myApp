
import React, { useState, useEffect } from "react";
import "./item.css";
import PopupUpdata from "./PopupUpdata";

export const Item = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);

  useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar-${props.id}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, [props.id]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const updateProduct = () => {
    fetch("http://localhost:3001/product_update", {
      method: "POST",
      body: JSON.stringify({ name, price, id: props.id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      togglePopup();
      props.getProducts();
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageSrc = reader.result;
      setAvatar(imageSrc);
      localStorage.setItem(`avatar-${props.id}`, imageSrc);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetValues = () => {
    setName(props.name);
    setPrice(props.price);
  };

  const resetImage = () => {
    setAvatar(null);
    localStorage.removeItem(`avatar-${props.id}`);
  };

  return (
    <div className="block">
      <div className="block_row">
        <div className="block_column">
          <div className="block_item">
            <div className="card">
              {avatar && (
                <img src={avatar} alt="Photo" style={{ width: "100%" }} />
              )}
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
                  Delete
                </button>
                <button onClick={togglePopup}>Edit</button>
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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button onClick={updateProduct}>Save</button>
            </div>
          }
        />
      )}
    </div>
  );
};
