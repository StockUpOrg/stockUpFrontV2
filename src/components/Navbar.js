function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 px-6 py-4 lg:py-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          src={require("../assets/logo.png")}
          alt="Logo"
          width={50}
          height={50}
        />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 font-extrabold text-2xl animate-text pl-10">
          StockUP
        </span>
      </div>
      <div className="w-full lg:w-auto lg:flex-grow lg:flex lg:items-center">
        <div className="text-sm lg:flex-grow text-right">
          <a
            href="/"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white mr-4 text-xl font-semibold"
          >
            Home
          </a>
          <a
            href="/prediction"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white mr-4 text-xl font-semibold"
          >
            Forecast
          </a>
          <a
            href="/about"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white mr-4 text-xl font-semibold"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white text-xl font-semibold"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
