import logo from "./logo.svg";
import "./App.css";
import WeatherApp from "./component/WeatherApp";

function App() {
  return (
    <div className="App ">
      <header className="App-header bg-gradient">
        <WeatherApp />
      </header>
    </div>
  );
}

export default App;
