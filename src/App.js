// import logo from "./logo.svg";
import "./App.css";
import Itinerary from "./Itinerary.js";
import Navbar from "./Navbar.js";
import Map from "./Map.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="main_app">
        <Itinerary />
        <Map />
      </div>
    </div>
  );
}

export default App;
