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
        <span className="font-semibold text-xl tracking-tight pl-4">
          Stock Up
        </span>
      </div>
      <div className="w-full lg:w-auto lg:flex-grow lg:flex lg:items-center">
        <div className="text-sm lg:flex-grow text-right">
          <a
            href="/"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white mr-4"
          >
            Home
          </a>
          <a
            href="/prediction"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white mr-4"
          >
            Predict
          </a>
          <a
            href="/about"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white mr-4"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="block mt-4 lg:mt-0 lg:inline-block text-teal-200 hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
