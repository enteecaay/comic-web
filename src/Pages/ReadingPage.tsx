import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, Space, theme } from "antd";
import type { MenuProps } from "antd";

interface ReadingPageProps {
  chapter_api_data: string;
  chapterList: any;
  name: string;
}

const ReadingPage: React.FC = () => {
  const location = useLocation();
  const { chapter_api_data, chapterList, name } =
    location.state as ReadingPageProps;
  const { token } = theme.useToken();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(chapter_api_data);
      const data = await response.json();
      console.log("data", data.data.domain_cdn);
    };
    fetchData();
    console.log("chapter_api_data", chapter_api_data);
    console.log("chapterList", chapterList);
    console.log("name", name);
  }, [chapter_api_data, chapterList, name]);

  const items: MenuProps["items"] = chapterList.map(
    (chapter: any, index: number) => ({
      key: index,
      label: (
        <Link
          to="#"
          state={{ chapter_api_data: chapter.server_data, chapterList, name }}
          className="text-gray-200 text-pretty hover:font-bold"
        >
          {chapter.title
            ? chapter.chapter_name + chapter.title
            : `Chapter ${chapter.chapter_name}`}
        </Link>
      ),
    })
  );

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl font-semibold mt-4 text-center">{name}</h2>
      <div className="w-full flex justify-center mt-4">
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
          <Button className="w-[20rem] flex justify-between items-center font-medium text-lg ">
            Select Chapter <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-10/12 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;
