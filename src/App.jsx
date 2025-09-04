// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"; 
import './App.css';

// Components
import Header from './Component/Header';
import Footer2 from './Component/Footer/Footer2';
import ComingSoon from './Component/ComingSoon';
import ProductDetails from "./Component/ProductDetail";
import CartPage from "./Component/CartPage"; // new cart page
// ScrollToTop import
import ScrollToTop from './Component/ScrollToTop';

// Home import
import Home from './Component/Home';

//INFORMATION Section
import About from './Component/Information/About'
import Blog from './Component/Information/Blog';
import TermsConditions from './Component/Information/TermsConditions'
import Contact from './Component/Information/Contact'
import OurTeam from './Component/Information/OurTeam'
import Faqs from './Component/Information/Faqs'

//POLICIES
import ReturnExchangeRequest from './Component/Policies/ReturnExchangeRequest';
import ReturnsExchanges from './Component/Policies/ReturnsExchanges'
import ShipingPolicy from './Component/Policies/ShipingPolicy'
import PrivacyPolicy from './Component/Policies/PrivacyPolicy';
import CancelPolicy from './Component/Policies/CancelPolicy'

//Chatpopup
import ChatPopup from "./Component/ChatPopup";

// Career page import
import Career from './Component/Information/Career';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
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
            {/* Career page route */}
            <Route path="/career" element={<Career />} />
              {/* Product Details Route */}
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* Cart Route */}
              <Route path="/cart" element={<CartPage />} />

              {/* Catch-all */}
              <Route path="*" element={<ComingSoon />} />
              {/* Home route (default page content) */}
            <Route
              path="/"
              element={<Home />}
            />
            </Routes>
          </main>
          <Footer2 />
        </div>
      </BrowserRouter>
      <ChatPopup />
    </CartProvider>
  );
}

export default App;
