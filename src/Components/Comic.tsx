import React, { useEffect } from "react";

interface ComicProps {
  chapter_api_data: string;
}

const Comic = (chapter_api_data) => {
  useEffect(() => {
    console.log("chapter_api_data", chapter_api_data);
  }, [chapter_api_data]);
  return <div>Comic</div>;
};

export default Comic;
