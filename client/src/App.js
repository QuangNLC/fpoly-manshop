import { BrowserRouter, Routes, Route } from "react-router-dom";
import './app.css';
import WebsiteLayout from "./layout/WebsiteLayout";
import WebHomePage from "./pages/website/WebHomePage";
import WebProductList from "./pages/website/WebProductList";
import WebContact from "./pages/website/WebContact";
import WebAboutUs from "./pages/website/WebAboutUs";
import Login from "./pages/website/Login";
import Register from "./pages/website/Register";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducer/RootReducer";
import { createStore } from "redux";
import ProductDetail from "./components/Products/ProductDetail";
import ProductDetailPage from "./pages/website/WebProductDetail";
import Cart from "./components/Products/Cart";
import Webcart from "./pages/website/Webcart";
import AdminLayout from "./layout/AdminLayout";
import AdmDashboard from "./pages/admin/AdmDashboard";
import AdmUserList from "./pages/admin/AdmUserList";
import AdmNewUser from "./pages/admin/AdmNewUser";
import ProductList from "./components/Products/ProductList";
import AdmUserDetail from "./pages/admin/AdmUserDetail";
import WebLogin from "./pages/website/WebLogin";

import {data} from './data'
import WebMyOrders from "./pages/website/WebMyOrders";
import AdmOrderList from "./pages/admin/AdmOrderList";
import AdmNewProduct from "./pages/admin/AdmNewProduct";
import AdmCategoryList from "./pages/admin/AdmCategoryList";
import WebMessage from "./pages/website/WebMessage";
import AdmProductList from "./pages/admin/AdmProductList";
import WebRegister from "./pages/website/WebRegister";
import AdmEditProductDetails from "./pages/admin/AdmEditProductDetails";
import WebMyAccount from "./pages/website/WebMyAccount";
function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<WebHomePage />} />
            {/* <Route path="products" element={<ProductList data={data}/>} /> */}
            {/* <Route path="cart" element={<Cart />} /> */}
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="productdetail" element={<ProductDetail />} /> */}
            {/* <Route path="register" element={<Register />} /> */}

            <Route path="products" element={<WebProductList />} />
            <Route path="cart" element={<Webcart />} />
            <Route path="my-orders" element={<WebMyOrders />} />
            <Route path="my-account" element={<WebMyAccount />} />
            <Route path="about-us" element={<WebAboutUs />} />
            <Route path="contact" element={<WebContact />} />
            <Route path="/register" element={<WebRegister />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="login" element={<WebLogin />} />
            <Route path="message" element={<WebMessage />} />
            <Route path="*" element={<div>Trang khong ton tai</div>} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdmDashboard />} />
            <Route path="user-list" element={<AdmUserList />} />
            <Route path="new-user" element={<AdmNewUser />} />
            <Route path="order-list" element={<AdmOrderList />} />
            <Route path="category-list" element={<AdmCategoryList />} />
            <Route path="product-list" element={<AdmProductList />} />
            <Route path="new-product" element={<AdmNewProduct />} />
            <Route path="edit-product/:productId" element={<AdmEditProductDetails />} />
            <Route path="user/:username" element={<AdmUserDetail />} />
            <Route path="message" element={<WebMessage />} />
            <Route path="*" element={<div>Trang khong ton tai</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
