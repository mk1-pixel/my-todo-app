import "./App.css";
import DetailPage from "./components/DetailPage/DetailPage.jsx";
import DetailEditPage from "./components/DetailEditPage/DetailEditPage.jsx";
import Home from "./components/Home/Home.jsx";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { TagProvider } from "./context/TagContext.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/detail/:id"
            element={
              <TagProvider>
                <DetailPage />
              </TagProvider>
            }
          />
          <Route
            path="/detail/:id/edit/"
            element={
              <TagProvider>
                <DetailEditPage />
              </TagProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
