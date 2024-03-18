import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// In App.js
import Layout from "./Layout"; // Import the Layout component
import About from "./pages/About";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact";
import Prediction from "./pages/Prediction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/prediction"
          element={
            <Layout>
              <Prediction />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
