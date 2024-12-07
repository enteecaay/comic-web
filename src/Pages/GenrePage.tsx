import React from "react";
import { useParams } from "react-router-dom";
import ComicCard from "../Components/ComicCard";
import { getComicByGenre } from "../api/ComicApi";

const GenrePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [genreData, setGenreData] = React.useState<any>([]);
  const [baseThumbnail, setBaseThumbnail] = React.useState<string>("");
  const [pagination, setPagination] = React.useState<any>({});
  React.useEffect(() => {
    try {
      const fetchDataGenre = async () => {
        if (slug) {
          const response = await getComicByGenre(slug, 1);
          setGenreData(response.data);
          setBaseThumbnail(
            `${response.data.APP_DOMAIN_CDN_IMAGE}/uploads/comics/`
          );
          setPagination(response.data.params.pagination);
        } else {
          console.error("Slug is undefined");
        }
      };
      fetchDataGenre();
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  return (
    <div>
      <div className="w-full grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {/* Add comic list here */}
        {genreData?.items?.map((comic: any, index: number) => (
          <ComicCard
            key={comic.index}
            id={comic.id}
            name={comic.name}
            slug={comic.slug}
            thumbnail={baseThumbnail + comic.thumb_url}
            status={comic.status}
            category={comic.category}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-10"></div>
      {pagination.pageRanges > 1 && (
        <div className="w-full flex justify-center space-x-5 mt-4 mb-4">
          {Array.from({ length: pagination.pageRanges }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-black ${
                pagination.current_page === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                const fetchPage = async (page: number) => {
                  if (slug) {
                    const response = await getComicByGenre(slug, page);
                    setGenreData(response.data);
                    setPagination(response.data.params.pagination);
                  } else {
                    console.error("Slug is undefined");
                  }
                };
                fetchPage(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;
