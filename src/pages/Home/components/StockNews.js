import React from "react";

const StockNews = ({ stockNews }) => {
  return (
    <div id="news">
      <h2>Stock News and Analysis</h2>
      {stockNews.map((newsItem) => (
        <div key={newsItem.uuid}>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.publisher}</p>
          <a href={newsItem.link} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default StockNews;
