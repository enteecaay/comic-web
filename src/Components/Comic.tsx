interface ComicProps {
  baseUrl: string;
  chapterData: any[];
}

const Comic: React.FC<ComicProps> = ({ baseUrl, chapterData }) => {
  if (!Array.isArray(chapterData)) {
    return <div>No chapter data available</div>;
  }
  console.log("chapterData", chapterData);
  return (
    <div className="w-full max-w-screen-xl flex flex-col justify-center">
      {(chapterData.length > 0 &&
        chapterData &&
        chapterData.map((chapter, index) => (
          <img
            key={index}
            src={`${baseUrl}${chapter.image_file}`}
            alt="comic"
            className="w-full h-1/2"
            loading="lazy"
          />
        ))) || <div>No chapter data available</div>}
    </div>
  );
};

export default Comic;
