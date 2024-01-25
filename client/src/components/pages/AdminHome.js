import React from "react";
import Navbar from "../common/Navbar";
import "../styles/AdminHome.css";
import Slider from "../common/Slider";

const Home = () => {
  return (
    <>
      <Navbar />

      <ActiveSiteList />

      <PreviousSiteList />
    </>
  );
};

const ActiveSiteList = () => {
  return (
    <div className="homepage__container">
      <div className="homepage__inner_container">
        <div className="sites__heading">
          <span className="heading_red_color">Live</span> Sites
        </div>

        <Slider />
      </div>
    </div>
  );
};

const PreviousSiteList = () => {
  return (
    <div className="homepage__container">
      <div className="homepage__inner_container">
        <div className="sites__heading">
          <span className="heading_red_color" style={{ color: "#808080" }}>
            Past
          </span>{" "}
          Sites
        </div>

        <Slider />
      </div>
    </div>
  );
};

export default Home;
