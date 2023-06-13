import logo from "./logo.svg";
import "./App.css";
import { Item } from "./components/item";

import { Header } from "./components/header";
import { useEffect, useState } from "react";
import { Menu } from "./components/menu";
// import { Footer } from "./components/footer";
import { Nav } from "./components/nav";

export default function App() {
  const [products, setProducts] = useState([]);

  const [user, setUser] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const isAdmin = user.role === "admin";

  const getUser = async () => {
    const response = await fetch("http://localhost:3001/user");
    const result = await response.json();
    setUser(result);
  };

  const getProducts = async () => {
    const response = await fetch("http://localhost:3001/products");

    const result = await response.json();
    setProducts(result);
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
    const response = fetch("http://localhost:3001/delete_product", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getProducts();
    });
  };

  return (
    <main>
      <Header>
        <Nav setInput={setInput} applyFilter={applyFilter} />
        
        <Menu isAdmin={isAdmin} getProducts={getProducts} />
      </Header>




      <article>
        <div className="block_container">
          {(input ? filteredProducts : products).map(({ _id, name, price }) => (
            <Item
              key={_id}
              name={name}
              price={price}
              id={_id}
              deleteProduct={deleteProduct}
              getProducts={getProducts}
            />
          ))}
        </div>
      </article>

      <aside></aside>

      <footer>{/* <Footer name={"Ivan"} surname={"Ivanenco"} /> */}</footer>
    </main>
  );
}
