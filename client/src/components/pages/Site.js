import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../common/Navbar";
import "../styles/Site.scss";
import Slider from "../common/Slider";
import dduImage from "../../assets/images/site.png";
import PopupSiteCard from "../common/PopupSiteCard";
import { onSiteTape } from "../../features/global/globalSlice";
import "../styles/Popup.scss"

const Site = () => {
  const state = useSelector((state) => state.site);

  let site = state.data;

  return (
    <>
      <Navbar />
      <div className="site__container">
        <div className="upper__container">
          <SiteCard data={site} />
          <ExpensePieChart />
        </div>
        <div className="lower__container">
          <SiteDetails fields={site.siteDetails} />
        </div>

        <PopupSiteCard site={site} />
      </div>
    </>
  );
};

const SiteCard = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="site_card__container">
      <div className="information__container">
        <h2>{data?.title}</h2>

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
        </div>
      </div>

      <div className="image__container">
        <img src={dduImage} alt="ddu" />
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
