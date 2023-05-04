import logo from './logo.svg';
import './App.css';


const listOfProducts = [{ id: 1, name: 'T4w', price: 799 }, {id: 2, name: 'Xbox ', price: 2}, {id: 3, name: 'GamesirT3s ', price: 2}, {id: 4, name: 'GamesirF2 ', price: 2}, {id: 5, name: 'GamesirF2 ', price: 2}, {id: 6, name: 'LogitechF310 ', price: 2}, {id: 7, name: 'FirestickL1 ', price: 2}, {id: 8, name: 'JPD-UDV-01 ', price: 2}, {id: 9, name: 'CND-GPW3 ', price: 2}, {id: 10, name: 'DualSense ', price: 2}]


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          1 Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
