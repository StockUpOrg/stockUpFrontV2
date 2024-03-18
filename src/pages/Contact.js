import React from "react";
import About from "./About";

const Contact = () => {
  return (
    <>
      <About />
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-8 ">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-semibold mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full h-32 resize-none"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <a
            href="mailto:gsingh75@lakeheadu.ca"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg inline-block focus:outline-none focus:shadow-outline"
          >
            Send Message
          </a>
        </form>
      </div>
    </>
  );
};

export default Contact;
