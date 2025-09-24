import React from "react";
import OfferZone from "./OfferZone";
import Collection from "./Collection";
import SuitSet from "./SuitSet";
import ExploreAndBuy from "./ExploreAndBuy";
import Footer1 from "./Footer/Footer1";
import About from "./Information/About";
import BlogPage from "./Information/BlogPage";

const Home = () => {
  return (
    <div>
      <OfferZone />
      <Collection />
      <SuitSet />
      <ExploreAndBuy />
      <BlogPage />
      <Footer1 />
      <About />
    </div>
  );
};

export default Home;
