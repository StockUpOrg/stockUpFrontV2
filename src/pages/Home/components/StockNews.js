import React from "react";

const StockNews = ({ stockNews }) => {
  return (
    <div id="news" className="w-full h-full overflow-auto">
      <h2 className="text-2xl font-bold my-4">Stock News and Analysis</h2>
      <div className="space-y-6">
        {stockNews.map((newsItem) => (
          <div
            key={newsItem.uuid}
            className="bg-white shadow-lg rounded-lg p-4 hover:bg-gray-100"
          >
            <h3 className="text-xl font-semibold">{newsItem.title}</h3>
            <p className="text-gray-600">{newsItem.publisher}</p>
            {newsItem.thumbnail && newsItem.thumbnail.resolutions && (
              <img
                src={newsItem.thumbnail.resolutions[1]?.url}
                alt=""
                className="my-2 max-w-full h-auto rounded"
              />
            )}
            <a
              href={newsItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNews;
