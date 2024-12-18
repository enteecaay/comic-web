import React, { useState } from "react";
import { getGenres } from "../api/ComicApi";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Divider, Dropdown, Space, theme } from "antd";
import type { MenuProps } from "antd";

const NavBar: React.FC = () => {
  const [genres, setGenres] = React.useState<any>([]);
  const { token } = theme.useToken();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetch genres
        const response = await getGenres();
        setGenres(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []);

  //Genre Dropdown list config
  const items: MenuProps["items"] = genres.map((genre: any, index: number) => ({
    key: index,
    label: (
      <Link
        to={`/genre/${genre.slug}`}
        state={{ genre: genre.genre_name }}
        className="text-gray-200 text-pretty text-lg hover:font-bold"
      >
        {genre.name}
      </Link>
    ),
  }));

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
    maxHeight: "50vh",
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="w-screen min-w-full lg:flex flex-wrap justify-between items-center py-4 bg-gray-800 text-white shadow-xl shadow-gray-700 lg:flex-row">
        <div className="text-2xl font-bold ml-48 hidden lg:block">
          <a href="/">Comic Web</a>
        </div>
        <div className="hidden space-x-4 text-xl font-semibold mr-[50rem] lg:flex">
          <a
            href="/"
            className="rounded-xl w-32 h-12 flex justify-center items-center hover:bg-white hover:text-black"
          >
            Home
          </a>
          <button className="rounded-xl w-32 h-12 flex justify-center items-center hover:bg-white hover:text-black bg-transparent">
            Category
          </button>
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu as React.ReactElement, {
                  style: menuStyle,
                })}
                <Divider style={{ margin: 0 }} />
                <Space style={{ padding: 8 }} />
              </div>
            )}
          >
            <button className="rounded-xl w-32 h-12 flex justify-center items-center hover:bg-white hover:text-black bg-transparent">
              Genres <DownOutlined />
            </button>
          </Dropdown>
        </div>
        <button className="md:hidden" onClick={toggleSidebar}>
          <span className="text-2xl">&#9776;</span>
        </button>
      </nav>
      <div
        className={`fixed top-0 left-0 z-50 w-full h-full bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={toggleSidebar}
        >
          &times;
        </button>
        <div className="flex flex-col space-y-4 mt-16">
          <a
            href="/"
            className="rounded-xl w-full h-12 flex justify-center items-center hover:bg-white hover:text-black"
          >
            Home
          </a>
          <button className="rounded-xl w-full h-12 flex justify-center items-center hover:bg-white hover:text-black bg-transparent">
            Category
          </button>
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu as React.ReactElement, {
                  style: menuStyle,
                })}
                <Divider style={{ margin: 0 }} />
                <Space style={{ padding: 8 }} />
              </div>
            )}
          >
            <button className="rounded-xl w-full h-12 flex justify-center items-center hover:bg-white hover:text-black bg-transparent">
              Genres <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
