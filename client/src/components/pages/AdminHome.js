import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import "../styles/AdminHome.css";
import Slider from "../common/Slider";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/projects/projectSlice";
import Popup from "../common/Popup";
import PopupContractorCard from "../common/PopupContractorCard";
import { contractor, site } from "../../data/Data";
import PopupSiteCard from "../common/PopupSiteCard";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.project);

  const projects = state.data;
  const activeSites = projects?.filter(
    (project) => project.status === "in_progress"
  );
  const pendingSites = projects?.filter(
    (project) => project.status === "pending"
  );

  useEffect(() => {
    if (!projects) {
      dispatch(fetchProjects("http://127.0.0.1:8000/api/v1/projects/"));
    }
  }, [dispatch, projects]);

  return (
    <>
      <Navbar />

      <ActiveSiteList sites={activeSites} />

      <PreviousSiteList sites={pendingSites} />

      <Popup>
        <PopupSiteCard site={site} />
      </Popup>
    </>
  );
};

const ActiveSiteList = ({ sites }) => {
  return (
    <div className="homepage__container">
      <div className="homepage__inner_container">
        <div className="sites__heading">
          <span className="heading_red_color">Live</span> Sites
        </div>

        <Slider data={sites} />
      </div>
    </div>
  );
};

const PreviousSiteList = ({ sites }) => {
  return (
    <div className="homepage__container">
      <div className="homepage__inner_container">
        <div className="sites__heading">
          <span className="heading_red_color" style={{ color: "#808080" }}>
            Past
          </span>{" "}
          Sites
        </div>

        <Slider data={sites} />
      </div>
    </div>
  );
};

export default Home;
