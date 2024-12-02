import React from "react";
import { useParams } from "react-router-dom";
import { getComicDetail } from "../api/ComicApi";

const ComicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [comicDetail, setComicDetail] = React.useState<any>({});
  const [baseThumbnail, setBaseThumbnail] = React.useState<string>("");
  const [seoOnPage, setSeoOnPage] = React.useState<any>({});
  const [seoSchema, setSeoSchema] = React.useState<any>({});
  const [chapterList, setChapterList] = React.useState<any>([]);
  React.useEffect(() => {
    const fetchDataComicDetail = async () => {
      try {
        // Fetch comic detail by slug
        if (slug) {
          const response = await getComicDetail(slug);
          setComicDetail(response.data.item);
          setBaseThumbnail(response.data.APP_DOMAIN_CDN_IMAGE);
          setSeoOnPage(response.data.seoOnPage);
          setSeoSchema(response.data.seoOnPage.seoSchema);
          setChapterList(response.data.item.chapters[0].server_data);
          console.log("response", response.data.item.chapters[0]);
        } else {
          console.error("Slug is undefined");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataComicDetail();
  }, [slug]);
  return (
    <div className="w-full h-screen grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-6/12">
          <img
            src={`${baseThumbnail}/uploads/comics/${comicDetail.thumb_url}`}
            alt="Comic Thumbnail"
            className="object-center object-cover rounded-md w-full"
          />
        </div>
        <div className="w-full mt-4 pr-2 pl-2">
          <h2 className="text-center text-2xl mt-4">{comicDetail.name}</h2>
          <h3 className="mt-4 text-sm font-light">{seoSchema.name}</h3>
          <div className="w-full flex flex-wrap">
            {comicDetail.category?.map((item: any) => (
              <div
                className="flex justify-center items-center rounded-3xl bg-blue-400 m-2 p-2 "
                key={item.id}
              >
                <p className="font-normal text-xs text-black font-mono">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-2 text-xl font-serif">
            Author:{" "}
            <strong>
              {Array.isArray(comicDetail.author)
                ? comicDetail.author.map((author: string, index: number) => (
                    <span key={index} className="mr-2">
                      {author}{" "}
                      {index < comicDetail.author.length - 1 ? "," : ""}
                    </span>
                  ))
                : null}
            </strong>
          </h3>
          <h3 className="mt-2 text-sm font-light">
            {seoOnPage.descriptionHead}
          </h3>
        </div>
        <div
          className="w-full mt-4 text-black bg-white p-4 rounded-xl h-52 overflow-y-auto pl-2 pr-2"
          dangerouslySetInnerHTML={{ __html: comicDetail.content }}
        />
        <div className="flex justify-center items-center">
          {comicDetail.description}
        </div>
      </div>
      <div className="w-full h-screen flex flex-col justify-center items-center sm:mt-10 xs:mt-10 md:mt-10">
        <h1 className="text-3xl text-white font-serif font-bold mb-4">
          Chapter List
        </h1>
        <div className="w-11/12 bg-white rounded-2xl flex flex-col justify-center items-center h-screen overflow-y-scroll shadow-gray-900 shadow-inner">
          {chapterList.map((chapter: any, index: number) => (
            <div
              key={index}
              className="w-11/12 h-10 flex justify-center items-center text-black mt-1 border-2 border-gray-400 rounded-lg"
            >
              <h3 className="text-sm font-light">
                {chapter.chapter_title
                  ? chapter.chapter_name + " - " + chapter.chapter_title
                  : "Chapter: " + chapter.chapter_name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;
