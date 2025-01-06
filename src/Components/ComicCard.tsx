import React from "react";
import { Link } from "react-router-dom";

interface ComicCardProps {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  status: string;
  category: string[];
}

const ComicCard: React.FC<ComicCardProps> = ({
  id,
  name,
  slug,
  thumbnail,
  status,
  category,
}) => {
  return (
    <div
      key={id}
      className="w-full max-w-sm h-96 flex flex-col justify-start items-center border-2 rounded-lg shadow-lg shadow-gray-400 relative"
    >
      <a href={`/comic/${slug}`}>
        <div className="w-full h-full flex flex-col absolute top-0 left-0">
          <img
            className="w-full h-full rounded-md opacity-65"
            src={thumbnail}
            alt={slug}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col w-full justify-start items-start p-2 absolute top-2/4 left-0">
          <h2 className="flex text-center font-bold mt-2 text-base lg:text-lg">
            {name}
          </h2>
          <p className="flex font-light text-xs ">
            <strong>Status: </strong>
            {status}
          </p>

          <div className="lg:flex flex-wrap mt-2 mb-2 hidden">
            {category.map((item: any) => (
              <div
                className="flex justify-center items-center rounded-3xl bg-blue-400 m-1 p-1 "
                key={item.id}
              >
                <p className="font-extralight text-xs text-black font-mono">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </a>
      <div className="flex w-full justify-center items-end absolute bottom-8">
        <Link to={`/comic/${slug}`}>
          <button className=" h-4 p-4 flex justify-center items-center border-white hover:bg-white hover:text-black font-sans text-lg">
            Read
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComicCard;
