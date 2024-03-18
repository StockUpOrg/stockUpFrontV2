import React from "react";

const About = () => {
  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">About StockUP</h2>
      <p className="text-lg mb-4">
        StockUP is a stock data visualization and analysis platform designed to
        simplify stock data for beginners. Our platform provides users with
        comprehensive stock information, including stock charts, historical
        data, news, and predictions, to help them make informed investment
        decisions.
      </p>
      <h3 className="text-xl font-semibold mb-2">Terms and Conditions</h3>
      <ul className="list-disc pl-5 mb-4">
        <li>Users must agree to our Terms of Service and Privacy Policy.</li>
        <li>
          StockUP is for informational purposes only and does not constitute
          financial advice.
        </li>
        <li>
          Users are responsible for their investment decisions and should
          consult with a financial advisor if needed.
        </li>
      </ul>
      <p className="text-lg">
        StockUP is proudly developed by students from Lakehead University,
        passionate about making stock data accessible to everyone.
      </p>
    </div>
  );
};

export default About;
