import React from "react";
import OfferZone from "./Offerzone";  
import Collection from "./Collection";
import ExploreAndBuy from "./ExploreAndBuy";
import SuitSet from "./SuitSet";
// import LuxeSet from "./LuxeSet";
import Footer1 from "./Footer/Footer1";
import About from "./Information/About";
// import InstagramReels from "./Instagram/InstagramReels";

const Home = () => {
  return (
    <div>
      <OfferZone />
      <Collection />
      <SuitSet />
      <ExploreAndBuy />
      {/* <LuxeSet /> */}
      {/* <InstagramReels /> */}
      <Footer1 />
      <About />
    </div>
  );
};

export default Home;
