import logo from "./logo.svg";
import "./App.css";
import { listOfProducts } from "./data.js";

export default function List() {
  const listItems = listOfProducts.map((listOfProducts) => (
    <div className="block">
      <div className="block_row">
       
       
         <div className="block_column">
          <div className="block_item" key={listOfProducts.id}>
            <p>
              <b>{listOfProducts.name}:</b>
              {" " + listOfProducts.price + " "}
            </p>            
          </div>
        </div>

      </div>
    </div>
    
  ));
  return (
    <article>
  {/* { <h1>Scientists</h1> } */}
      <div className="block_container" >{listItems}</div>
    </article>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           1 Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// export default App;
