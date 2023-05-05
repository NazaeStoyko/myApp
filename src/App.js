import logo from "./logo.svg";
import "./App.css";
import { listOfProducts } from './data.js';





export default function List() {
  const listItems = listOfProducts.map(listOfProducts =>
    <li key={listOfProducts.id}>
      {/* <img
        src={getImageUrl(listOfProducts)}
        alt={listOfProducts.name}
      /> */}
      <p>
        <b>{listOfProducts.name}:</b>
        {' ' + listOfProducts.price + ' '}
        {/* known for {listOfProducts.accomplishment} */}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
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
