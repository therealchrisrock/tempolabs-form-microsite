import { Suspense } from "react";
import routes from "tempo-routes";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {useRoutes(routes)}
        </>
      </Suspense>
    </>
  );
}

export default App;
