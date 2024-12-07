import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} Comic Web. All rights reserved.
        </p>
        <p className="text-sm mb-2">
          This project is a web application for browsing and reading comics.
        </p>
        <a
          href="https://github.com/enteecaay/comic-web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          GitHub Repository
        </a>
        <div className="w-full">
          <p className="text-right">@enteecaay</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
