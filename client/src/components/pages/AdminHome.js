import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import "../styles/AdminHome.css";
import Slider from "../common/Slider";

import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/projects/projectSlice";
import { getData } from "../../api/apis";
import { baseurl } from "../../config";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.project);

  const projects = state.data;

  var activeSites, pendingSites, previousSites;

  if (projects) {
    activeSites = projects?.filter(
      (project) => project.status === "in_progress"
    );
    pendingSites = projects?.filter((project) => project.status === "pending");
    previousSites = projects?.filter(
      (project) => project.status === "completed"
    );
  }

  useEffect(() => {
    if (!projects) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`${baseurl}/api/profile/`);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar addSite={true} />

      <ActiveSiteList sites={activeSites} />

      <PendingSiteList sites={pendingSites} />

      <PreviousSiteList sites={previousSites} />
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

        {sites?.length !== 0 ? (
          <Slider data={sites} type={"site"} />
        ) : (
          <div>"No active sites"</div>
        )}
      </div>
    </div>
  );
};

const PendingSiteList = ({ sites }) => {
  return (
    <div className="homepage__container">
      <div className="homepage__inner_container">
        <div className="sites__heading">
          <span className="heading_red_color" style={{ color: "#808080" }}>
            Pending
          </span>{" "}
          Sites
        </div>
        {sites?.length !== 0 ? (
          <Slider data={sites} type={"site"} />
        ) : (
          <div>"No pending sites"</div>
        )}
      </div>
    </div>
  );
};

const PreviousSiteList = ({ sites }) => {
  return (
    <div className="homepage__container">
      <div className="homepage__inner_container">
        <div className="sites__heading">
          <span className="heading_red_color">Past</span> Sites
        </div>

        {sites?.length !== 0 ? (
          <Slider data={sites} type={"site"} />
        ) : (
          <div>"No previous sites"</div>
        )}
      </div>
    </div>
  );
};

export default Home;
