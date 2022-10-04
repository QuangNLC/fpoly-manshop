import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebsiteLayout from "./layout/WebsiteLayout";
import WebHomePage from "./pages/website/WebHomePage";
import WebProductList from "./pages/website/WebProductList";
import WebContact from "./pages/website/WebContact";
import WebAboutUs from "./pages/website/WebAboutUs";
import Login from "./pages/website/Login";
import Register from "./pages/website/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<WebHomePage />} />
          <Route path="products" element={<WebProductList />} />
          <Route path="about-us" element={<WebAboutUs />} />
          <Route path="contact" element={<WebContact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<div>Trang khong ton tai</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
