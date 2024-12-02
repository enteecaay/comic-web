import React from "react";
import { getHomeComicList } from "../api/ComicApi";
import ComicCard from "../Components/ComicCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3, // Adjust this to fit better on smaller screens
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2, // Reduce slides further for smaller screens
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  interface HomeData {
    seoOnPage?: {
      titleHead?: string;
      descriptionHead?: string;
    };
    items?: string[];
    // Add other properties if needed
  }

  const [homeData, setHomeData] = React.useState<HomeData>({});
  const titleHead = homeData?.seoOnPage;
  const [baseThumbnail, setBaseThumbnail] = React.useState<string>("");
  React.useEffect(() => {
    const fetchDataHome = async () => {
      try {
        const response = await getHomeComicList();
        setHomeData(response.data);
        setBaseThumbnail(
          `${response.data.APP_DOMAIN_CDN_IMAGE}/uploads/comics/`
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataHome();
  }, []);
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center border-white border-2 p-4 rounded-xl shadow-lg shadow-gray-400 mb-16 mt-10">
        <h2 className="font-semibold">{titleHead?.titleHead}</h2>
        <p className=" text-center font-light">{titleHead?.descriptionHead}</p>
      </div>
      <div className="w-11/12 flex flex-col justify-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="carousel-container w-full shadow-inner shadow-slate-500 p-10 rounded-2xl mb-10">
            <Slider {...settings}>
              {homeData?.items?.map((comic: any) => (
                <ComicCard
                  key={comic.id}
                  id={comic.id}
                  name={comic.name}
                  slug={comic.slug}
                  thumbnail={baseThumbnail + comic.thumb_url}
                  status={comic.status}
                  category={comic.category}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {/* Add comic list here */}
          {homeData?.items?.map((comic: any) => (
            <ComicCard
              key={comic.id}
              id={comic.id}
              name={comic.name}
              slug={comic.slug}
              thumbnail={baseThumbnail + comic.thumb_url}
              status={comic.status}
              category={comic.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
