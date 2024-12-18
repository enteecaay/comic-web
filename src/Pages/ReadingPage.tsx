import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Divider, Dropdown, Space, theme } from "antd";
import Comic from "../Components/Comic";

interface ReadingPageProps {
  chapter_api_data: string;
  chapterList: any[];
  name: string;
}

const ReadingPage: React.FC = () => {
  const location = useLocation();
  const { chapter_api_data, chapterList, name } =
    location.state as ReadingPageProps;
  const { token } = theme.useToken();

  // State variables
  const [currentChapterUrl, setCurrentChapterUrl] =
    useState<string>(chapter_api_data);
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [comicName, setComicName] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<any[]>([]);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setBaseUrl(`${data.data.domain_cdn}/${data.data.item.chapter_path}/`);
    setComicName(
      `${data.data.item.comic_name} - Chapter ${data.data.item.chapter_name}`
    );
    setSelectedChapter(data.data.item.chapter_image);
  };

  React.useEffect(() => {
    fetchData(currentChapterUrl);
  }, [currentChapterUrl]);

  const handleChapterSelect = (chapterUrl: string) => {
    setCurrentChapterUrl(chapterUrl); // Update the current chapter URL
  };

  const items = chapterList.map((chapter, index) => ({
    key: index,
    label: (
      <div
        onClick={() => handleChapterSelect(chapter.chapter_api_data)}
        className="text-black text-pretty hover:font-bold"
      >
        {chapter.title
          ? chapter.chapter_name + chapter.title
          : `Chapter ${chapter.chapter_name}`}
      </div>
    ),
  }));

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgBase,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  const handlePreviousChapter = () => {
    const currentIndex = chapterList.findIndex(
      (chapter) => chapter.chapter_api_data === currentChapterUrl
    );
    if (currentIndex > 0) {
      handleChapterSelect(chapterList[currentIndex - 1].chapter_api_data);
    }
  };

  const handleNextChapter = () => {
    const currentIndex = chapterList.findIndex(
      (chapter) => chapter.chapter_api_data === currentChapterUrl
    );
    if (currentIndex < chapterList.length - 1) {
      handleChapterSelect(chapterList[currentIndex + 1].chapter_api_data);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h2 className="text-3xl font-semibold mt-4 text-center">{name}</h2>
      <div className="w-full flex justify-center mt-4 gap-2">
        <Button onClick={handlePreviousChapter}>
          <ArrowLeftOutlined />
        </Button>
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
        <Button onClick={handleNextChapter}>
          <ArrowRightOutlined />
        </Button>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-full lg:w-6/12 flex flex-col justify-center">
          <div className="w-full">
            {comicName && (
              <h3 className="text-xl font-medium mb-4 text-center">
                {comicName}
              </h3>
            )}
          </div>
          <div className="w-full flex justify-center">
            {selectedChapter.length > 0 && (
              <Comic baseUrl={baseUrl} chapterData={selectedChapter} />
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-4 gap-2">
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            handlePreviousChapter();
          }}
        >
          <ArrowLeftOutlined />
        </Button>
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
        <Button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            handleNextChapter();
          }}
        >
          <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default ReadingPage;
