import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="w-screen min-w-full flex justify-between items-center p-4 bg-gray-800 text-white shadow-xl shadow-gray-700">
        <div className="text-2xl font-bold ml-48">Comic Web</div>
        <div className="flex space-x-4 text-xl font-semibold mr-[40rem]">
          <a
            href="/"
            className="rounded-xl w-24 h-8 flex justify-center items-center hover:bg-white hover:text-black"
          >
            Home
          </a>
          <button className="rounded-xl w-24 h-8 flex justify-center items-center hover:bg-white hover:text-black bg-transparent">
            Category
          </button>
          <button className="rounded-xl w-24 h-8 flex justify-center items-center hover:bg-white hover:text-black bg-transparent">
            Genres
          </button>
        </div>
        <div className="mr-48">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
