import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Categories from "./Categories";
import Dishes from "./Dishes";
import CityCookie from "./CityCookie";
import CookieExpiry from "./CookieExpiry";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/citycookie' element={<CityCookie />} />
          <Route path='/cookieexpiry' element={<CookieExpiry />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/' element={<Dishes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
