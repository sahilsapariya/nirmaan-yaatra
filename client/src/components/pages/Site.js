import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../common/Navbar";
import "../styles/Site.scss";
import Slider from "../common/Slider";
import PopupSiteCard from "../common/PopupSiteCard";
import { onSiteTape } from "../../features/global/globalSlice";
import "../styles/Popup.scss";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSite } from "../../features/site/siteSlice";
import { baseurl } from "../../config";
import { fields } from "../../data/Data";
import { deleteData } from "../../api/apis";
import { fetchProjects } from "../../features/projects/projectSlice";

const Site = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.site);
  const { siteId } = useParams();

  let site = state.data;

  useEffect(() => {
    dispatch(fetchSite(`${baseurl}/api/v1/projects/${siteId}/`));
  }, [dispatch, siteId]);

  return (
    <>
      <Navbar siteId={siteId} addContractor={true} />
      <div className="site__container">
        <div className="upper__container">
          <SiteCard data={site} />
          <ExpensePieChart />
        </div>
        <div className="lower__container">
          <SiteDetails fields={fields} />
        </div>

        <PopupSiteCard site={site} />
      </div>
    </>
  );
};

const SiteCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { siteId } = useParams();

  return (
    <div className="site_card__container">
      <div className="information__container">
        <h2>{data?.project_name}</h2>

        <table>
          <tr>
            <th>Location</th>
            <td>{data?.location}</td>
          </tr>
          <tr>
            <th>Client</th>
            <td>{data?.client_name}</td>
          </tr>
          <tr>
            <th>Budget</th>
            <td>{data?.budget}</td>
          </tr>
        </table>

        <div className="button">
          <button onClick={() => dispatch(onSiteTape())}>Show Details</button>
          {JSON.parse(localStorage.getItem("authTokens")).userType ===
            "ADMIN" && (
            <>
              <button
                onClick={() => navigate(`/site/${siteId}/edit-site`)}
                style={{ marginLeft: "1rem" }}
              >
                Edit Site Details
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await deleteData(`${baseurl}/api/v1/projects/${siteId}/`);
                  dispatch(fetchProjects());

                  navigate(`/home`);
                }}
                style={{ marginLeft: "1rem", background: "red" }}
              >
                Delete Site
              </button>
            </>
          )}
        </div>
      </div>

      <div className="image__container">
        <img src={data?.img_url} alt="ddu" />
      </div>
    </div>
  );
};

const ExpensePieChart = () => {
  return <div className="pie_chart">Pie chart</div>;
};

const SiteDetails = ({ fields }) => {
  return (
    <div className="homepage__container">
      <div className="homepage__inner_container">
        <div className="sites__heading">
          <span className="heading_red_color">Site</span> Details
        </div>

        {fields?.length !== 0 ? (
          <Slider data={fields} type={"site-detail"} />
        ) : (
          <div>"No active sites"</div>
        )}
      </div>
    </div>
  );
};

export default Site;
