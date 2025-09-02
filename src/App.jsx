// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import './App.css';

// Components
import Header from './Component/Header';
import OfferZone from './Component/Offerzone';
import Collection from './Component/Collection';
import SuitSet from './Component/SuitSet';
import LuxeSet from './Component/LuxeSet';
import Footer1 from './Component/Footer1';
import HappyCustomers from './Component/HappyCustomers';
import Footer2 from './Component/Footer2';
import ComingSoon from './Component/ComingSoon';
import ProductDetails from "./Component/ProductDetail";
import CartPage from "./Component/CartPage"; // new cart page

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                element={
                  <>
                    <OfferZone />
                    <Collection />
                    <SuitSet />
                    {/* <LuxeSet /> */}
                    <Footer1 />
                    {/* <HappyCustomers /> */}
                  </>
                }
              />

              {/* Product Details Route */}
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* Cart Route */}
              <Route path="/cart" element={<CartPage />} />

              {/* Catch-all */}
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
          <Footer2 />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
