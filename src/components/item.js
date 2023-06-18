import "./item.css";
import { useState } from "react";
import PopupUpdata from "./PopupUpdata";

export const Item = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);

  const [showInput, setShowInput] = useState(true);

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

  return (
    <div className="block">
      <div className="block_row">
        <div className="block_column">
          <div className="block_item">
            <div className="card">
      
              <img src={props.avatarUrl} alt="Photo" style={{ width: "100%" }} />
              <div className="container">
                <h4>
                  <b>{props.name}</b>
                </h4>
                <p>{"" + props.price + "₴"}</p>
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

            {isOpen && (
              <PopupUpdata
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

                    <button onClick={updateProduct}>Save</button>
                  </div>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
