import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <NavBar />
      </header>
      <main className="w-full bg-gray-900 pb-10">
        <Outlet />
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
