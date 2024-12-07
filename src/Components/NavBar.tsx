import React from "react";
import { getGenres } from "../api/ComicApi";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Divider, Dropdown, Space, theme } from "antd";
import type { MenuProps } from "antd";

const NavBar = () => {
  const [genres, setGenres] = React.useState<any>([]);
  const { token } = theme.useToken();

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
        to={genre.slug}
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

  return (
    <div>
      <nav className="w-screen min-w-full flex flex-wrap justify-between items-center p-4 bg-gray-800 text-white shadow-xl shadow-gray-700">
        <div className="text-2xl font-bold ml-48">Comic Web</div>
        <div className="flex space-x-4 text-xl font-semibold mr-[40rem]">
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="rounded-xl w-[20rem] h-12 pl-10 flex items-center font-normal"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
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
