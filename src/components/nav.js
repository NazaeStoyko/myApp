import React, { useState } from "react";
import Modal from "react-modal";
import { FaFilter } from "react-icons/fa";


import "./nav.css";

export const Nav = ({ setInput, applyFilter, applySortByPrice, applySortByHighestPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);
    applyFilter(value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav>
      <div className="nav-container">
        <input className="search" type="text" placeholder="search" onChange={handleInput} />

        <button className="filter-btn" onClick={handleOpenModal}>
          <i className="fas fa-filter">фільтр</i>
        </button>
      </div>

      <Modal className="modalNav" isOpen={isModalOpen} onRequestClose={handleCloseModal}>

        <h2>Sort by</h2>
        <button className="buttonModal" onClick={applySortByPrice}>Price (Low to High)</button>
        <button className="buttonModal" onClick={applySortByHighestPrice}>Price (High to Low)</button>
        <button className="buttonModal" onClick={handleCloseModal}>Close</button>

      </Modal>
    </nav>
  );
};









