import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Favorites from "./routes/Favorites";
import Navbars from "./components/Navbars";
import NotFound from "./routes/NotFound ";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbars />
      <div className="App w-5/6 m-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/forecast/:city/:key" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
