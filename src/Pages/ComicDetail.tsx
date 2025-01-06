import React from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import { getComicDetail } from "../api/ComicApi";
import { formatDateTime } from "../Util/Format";

const ComicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = React.useState<any>({});
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
          setData(response.data);
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
    <div className="w-full max-w-full h-full flex flex-wrap lg:flex-nowrap justify-center items-center bg-gray-900">
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full mt-4 pr-2 pl-2 mb-4">
          <nav className="text-sm font-light">
            {data.breadCrumb?.map((crumb: any, index: number) => (
              <span key={index}>
                <a
                  href={crumb.slug}
                  className="text-gray-200 hover:underline"
                  style={{ textDecoration: "none" }}
                >
                  {crumb.name}
                </a>
                {index < data.breadCrumb.length - 1 && " > "}
              </span>
            ))}
          </nav>
        </div>
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
          <h4 className="mt-2 text-sm font-light">
            {comicDetail.updatedAt
              ? formatDateTime(new Date(comicDetail.updatedAt))
              : "N/A"}
          </h4>
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
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white font-serif font-bold mb-4">
          Chapter List
        </h1>
        <div className="w-9/12 rounded-2xl flex flex-col justify-centers h-screen overflow-y-scroll shadow-gray-900 shadow-inner">
          {chapterList.length > 0 ? (
            chapterList.map((chapter: any, index: number) => (
              <Link
                key={index}
                to={`/comic/${slug}/chapter/${chapter.chapter_name}`}
                state={{
                  chapter_api_data: chapter.chapter_api_data,
                  chapterList: chapterList,
                  name: comicDetail.name,
                }}
                className="hover:bg-white hover:text-black -11/12 p-1.5 flex justify-center items-center text-white mt-1 border-2 border-gray-400 rounded-lg"
              >
                <h3 className="text-sm">
                  {chapter.chapter_title
                    ? chapter.chapter_name + " - " + chapter.chapter_title
                    : "Chapter: " + chapter.chapter_name}
                </h3>
              </Link>
            ))
          ) : (
            <h3 className="font-semibold text-xl">No chapter available yet</h3>
          )}
        </div>
      </div>
      <Outlet context={{ chapterList }} />
    </div>
  );
};

export default ComicDetail;
