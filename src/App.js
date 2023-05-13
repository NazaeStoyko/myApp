import logo from "./logo.svg";
import "./App.css";
import { Item } from "./components/item";

import { Header } from "./components/header";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3001/products");

    const result = await response.json();
    setProducts(result);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main>
      <Header />

      <article>
        <div className="block_container">
          {products.map(({ id, name, price }) => (
            <Item key={id} name={name} price={price} />
          ))}
        </div>
      </article>

      <aside></aside>

      <footer></footer>
    </main>
  );
}
