// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import './App.css';

// Components
import Header from './Component/Header';
import Footer2 from './Component/Footer/Footer2';
import ComingSoon from './Component/ComingSoon';
import ProductDetails from "./Component/ProductDetail";
import CartPage from "./Component/CartPage"; 
import ScrollToTop from './Component/ScrollToTop';
import ChatPopup from "./Component/ChatPopup";

// Home import
import Home from './Component/Home';

// INFORMATION Section
import About from './Component/Information/About'
import Blog from './Component/Information/Blog';
import TermsConditions from './Component/Information/TermsConditions'
import Contact from './Component/Information/Contact'
import OurTeam from './Component/Information/OurTeam'
import Faqs from './Component/Information/Faqs'
import Career from './Component/Information/Career';

// POLICIES
import ReturnExchangeRequest from './Component/Policies/ReturnExchangeRequest';
import ReturnsExchanges from './Component/Policies/ReturnsExchanges'
import ShipingPolicy from './Component/Policies/ShipingPolicy'
import PrivacyPolicy from './Component/Policies/PrivacyPolicy';
import CancelPolicy from './Component/Policies/CancelPolicy'

// Dashboard Pages
import DashboardLayout from "./pages/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import Category from "./pages/dashboard/Category";
import Product from "./pages/dashboard/Product";
import Banners from "./pages/dashboard/Banners";
import Users from "./pages/dashboard/Users";
import Orders from "./pages/dashboard/Orders";

function AppContent() {
  const location = useLocation();

  // ✅ agar path "/dashboard" se start hota hai to header/footer hide kar do
  const isDashboardRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/reports") ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/category") ||
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/banners") ||
    location.pathname.startsWith("/users") ||
    location.pathname.startsWith("/orders");

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          {/* Information Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shiping-policy" element={<ShipingPolicy />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cancel-policy" element={<CancelPolicy />} />
          <Route path="/return-exchange-request" element={<ReturnExchangeRequest />} />
          <Route path="/career" element={<Career />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/dashboard/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
          <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="/dashboard/category" element={<DashboardLayout><Category /></DashboardLayout>} />
          <Route path="/dashboard/product" element={<DashboardLayout><Product /></DashboardLayout>} />
          <Route path="/dashboard/banners" element={<DashboardLayout><Banners /></DashboardLayout>} />
          <Route path="/dashboard/users" element={<DashboardLayout><Users /></DashboardLayout>} />
          <Route path="/dashboard/orders" element={<DashboardLayout><Orders /></DashboardLayout>} />

          {/* Catch-all */}
          <Route path="*" element={<ComingSoon />} />

          {/* Home */}
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      {!isDashboardRoute && <Footer2 />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
      <ChatPopup />
    </CartProvider>
  );
}

export default App;
