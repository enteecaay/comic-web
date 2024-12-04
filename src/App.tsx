import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <div className="w-screen min-w-full flex justify-center items-start">
        <NavBar />
      </div>
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
