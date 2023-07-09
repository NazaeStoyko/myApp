import React, { useEffect, useState } from "react";
import "./App.css";
import { Item } from "./components/item";
import { Header } from "./components/header";
import { Menu } from "./components/menu";
import { Nav } from "./components/nav";
import Footer from "./components/footer";

export default function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const isAdmin = user.role === "admin";


  const getUser = async () => {

    const response = await fetch("/api/user");

    const result = await response.json();
    setUser(result);
  };

  const getProducts = async () => {
    const response = await fetch("/api/products");
    const result = await response.json();
    setProducts(result);
    setFilteredProducts(result);
  };

  useEffect(() => {
    getUser();
    getProducts();
  }, []);

  const [input, setInput] = useState("");

  const applyFilter = (inputValue) => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredProducts(result);
  };

  const deleteProduct = async (id) => {
    const response = await fetch("/api/delete_product", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      getProducts();
    }
  };

  const applySortByPrice = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedProducts);
  };

  const applySortByHighestPrice = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedProducts);
  };

  return (
    <main>
      <Header>
        <Nav
          setInput={setInput}
          applyFilter={applyFilter}
          applySortByPrice={applySortByPrice}
          applySortByHighestPrice={applySortByHighestPrice}
        />
        <Menu
          isAdmin={isAdmin}
          getProducts={getProducts}

        />
      </Header>

      <article>
        <div className="block_container">
          {filteredProducts.map(({ _id, name, price, imageUrl }) => (
            <Item
              key={_id}
              name={name}
              price={price}
              imageUrl={imageUrl}
              id={_id}
              deleteProduct={deleteProduct}
              getProducts={getProducts}
            />
          ))}
        </div>
      </article>

      <footer>
        <Footer />
      </footer>
    </main>
  );
}












