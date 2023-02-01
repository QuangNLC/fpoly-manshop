import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import AdmProtected from './layout/AdmProtected';
import WebsiteLayout from './layout/WebsiteLayout';
import WebCart from './pages/webs/WebCart';
import WebLogin from './pages/webs/WebLogin';
import WebProductDetail from './pages/webs/WebProductDetail';
import WebProducts from './pages/webs/WebProducts';
import WebRegister from './pages/webs/WebRegister';
import AdmWaitingOrderList from './pages/admins/AdmWaitingOrderList';
import AdmDashboard from './pages/admins/AdmDashboard';
import AdmWaitingOrderDetail from './pages/admins/AdmWaitingOrderDetail';
import AdmOrderList from './pages/admins/AdmOrderList';
import AdmOrderDetail from './pages/admins/AdmOrderDetail';
import WebHomePage from './pages/webs/WebHomePage';
import AdmCategoryList from './pages/admins/AdmCategoryList';
import AdmMaterialList from './pages/admins/AdmMaterialList';
import AdmColorList from './pages/admins/AdmColorList';
import AdmProductList from './pages/admins/AdmProductList';
import AdmNewProduct from './pages/admins/AdmNewProduct';
import AdmProductDetail from './pages/admins/AdmProductDetail';
import AdmUserList from './pages/admins/AdmUserList';
import AdmNewUser from './pages/admins/AdmNewUser';
import AdmUserDetail from './pages/admins/AdmUserDetail';
import WebMyAccount from './pages/webs/WebMyAccount';
import WebChangePassword from './pages/webs/WebChangePassword';
import WebMyOrders from './pages/webs/WebMyOrders';
import WebMyOrderDetail from './pages/webs/WebMyOrderDetail';
import AdmPromotionsList from './pages/admins/AdmPromotionsList';
import AdmNewPromotion from './pages/admins/AdmNewPromotion';
import AdmPromotionDetail from './pages/admins/AdmPromotionDetail';
import WebAdmLogin from './pages/webs/WebAdmLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<WebHomePage />} />
          <Route path="products" element={<WebProducts />} />
          <Route path="product/:id" element={<WebProductDetail />} />
          <Route path="cart" element={<WebCart />} />
          <Route path="register" element={<WebRegister />} />
          <Route path="login" element={<WebLogin />} />
          <Route path="my-account" element={<WebMyAccount />} />
          <Route path="change-password" element={<WebChangePassword />} />
          <Route path="my-orders" element={<WebMyOrders />} />
          <Route path="my-order/:id" element={<WebMyOrderDetail />} />
          <Route path="adm-login" element={<WebAdmLogin />} />


          {/* <Route path="products/search=:searchText" element={<WebProductList />} />
          <Route path="about-us" element={<WebAboutUs />} />
          <Route path="contact" element={<WebContact />} />
          <Route path="forgot-password" element={<WebForgotPassword />} />
          <Route path="message" element={<WebMessage />} /> */}
          <Route path="*" element={<div>Trang khong ton tai</div>} />
        </Route>
        <Route path="/admin" element={<AdmProtected><AdminLayout /></AdmProtected>}>
          <Route index element={<AdmDashboard />} />
          <Route path="waiting-order-list" element={<AdmWaitingOrderList />} />
          <Route path="waiting-order/:id" element={<AdmWaitingOrderDetail />} />
          <Route path="order-list" element={<AdmOrderList />} />
          <Route path="order/:id" element={<AdmOrderDetail />} />
          <Route path="category-list" element={<AdmCategoryList />} />
          <Route path="material-list" element={<AdmMaterialList />} />
          <Route path="color-list" element={<AdmColorList />} />
          <Route path="product-list" element={<AdmProductList />} />
          <Route path="product/new" element={<AdmNewProduct />} />
          <Route path="product/edit/:id" element={<AdmProductDetail />} />
          <Route path="user-list" element={<AdmUserList />} />
          <Route path="user/new" element={<AdmNewUser />} />
          <Route path="user/detail/:username" element={<AdmUserDetail />} />
          <Route path="promotion-list" element={<AdmPromotionsList />} />
          <Route path="promotion/new" element={<AdmNewPromotion />} />
          <Route path="promotion/detail/:id" element={<AdmPromotionDetail />} />


          {/*
          <Route path="message" element={<AdmMessage />} />
          <Route path="my-account" element={<AdmMyAccount />} />
          <Route path="change-password" element={<AdmChangePassword />} /> */}
          <Route path="*" element={<div>Trang khong ton tai</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
