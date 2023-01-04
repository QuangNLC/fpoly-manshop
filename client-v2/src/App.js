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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route path="products" element={<WebProducts />} />
          <Route path="product/:id" element={<WebProductDetail />} />
          <Route path="cart" element={<WebCart />} />
          <Route path="register" element={<WebRegister />} />
          <Route path="login" element={<WebLogin />} />

          {/* <Route index element={<WebHomePage />} />
          <Route path="products/search=:searchText" element={<WebProductList />} />
          <Route path="my-orders" element={<WebMyOrders />} />
          <Route path="my-account" element={<WebMyAccount />} />
          <Route path="change-password" element={<WebChangePassword />} />
          <Route path="about-us" element={<WebAboutUs />} />
          <Route path="contact" element={<WebContact />} />
          <Route path="forgot-password" element={<WebForgotPassword />} />
          <Route path="adm-login" element={<WebAdmLogin />} />
          <Route path="message" element={<WebMessage />} />
          <Route path="*" element={<div>Trang khong ton tai</div>} /> */}
        </Route>
        <Route path="/admin" element={<AdmProtected><AdminLayout /></AdmProtected>}>
          <Route index element={<AdmDashboard />} />
          <Route path="waiting-order-list" element={<AdmWaitingOrderList />} />
          <Route path="waiting-order/:id" element={<AdmWaitingOrderDetail />} />
          <Route path="order-list" element={<AdmOrderList />} />
          <Route path="order/:id" element={<AdmOrderDetail />} />

          {/* <Route path="user-list" element={<AdmUserList />} />
          <Route path="new-user" element={<AdmNewUser />} />
          <Route path="category-list" element={<AdmCategoryList />} />
          <Route path="material-list" element={<AdmMaterialList />} />
          <Route path="product-list" element={<AdmProductList />} />
          <Route path="new-product" element={<AdmNewProduct />} />
          <Route path="edit-product/:productId" element={<AdmEditProductDetails />} />
          <Route path="user/:username" element={<AdmUserDetail />} />
          <Route path="message" element={<AdmMessage />} />
          <Route path="bills" element={<AdmBills />} />
          <Route path="promotions" element={<AdmPromotions />} />
          <Route path="promotion/new" element={<AdmNewPromotions />} />
          <Route path="promotion/detail/:id" element={<AdmUpdatePromotion />} />
          <Route path="my-account" element={<AdmMyAccount />} />
          <Route path="change-password" element={<AdmChangePassword />} />
          <Route path="*" element={<div>Trang khong ton tai</div>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
