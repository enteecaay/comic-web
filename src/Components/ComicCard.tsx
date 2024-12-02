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
      className="flex flex-col justify-start items-center border-2 rounded-lg shadow-lg shadow-gray-400 m-4 p-4"
    >
      <a href={`/comic/${slug}`}>
        <div className="w-full flex flex-col top-0 flex-1 object-cover">
          <img
            className="object-cover rounded-md flex-1"
            src={thumbnail}
            alt={slug}
          />
          <h2 className="flex text-center font-bold mt-2">{name}</h2>
          <p className="flex font-light text-xs">
            <strong>Status: </strong>
            {status}
          </p>

          <div className="flex flex-wrap mt-2 mb-2 ">
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
      <div className="flex w-full justify-center items-end">
        <Link to={`/comic/${slug}`}>
          <button className="w-28 h-8 flex justify-center items-center border-white hover:bg-white hover:text-black font-sans text-lg">
            Read
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComicCard;
