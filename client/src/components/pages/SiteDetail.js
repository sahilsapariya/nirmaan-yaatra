import React from "react";
import Navbar from "../common/Navbar";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
// import Slider from "../common/Slider";
import "../styles/Site.scss";
import "../styles/SiteDetail.scss";

import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LegendToggleOutlinedIcon from "@mui/icons-material/LegendToggleOutlined";

const SiteDetail = () => {
  const { specialization } = useParams();

  const contractor = useSelector(
    (state) =>
      state.site.data.contractors.filter(
        (contractor) => contractor.specialization === specialization
      )[0]
  );
  console.log(contractor);

  return (
    <>
      <Navbar />
      <div className="site_detail__container">
        <div className="upper__container">
          {/* <Slider data={contractors} type={"contractors"} /> */}
          <ContractorCard data={contractor} />
          <ChartComponent />
        </div>
        <div className="lower__container">
          <div className="buttons">
            <button>
              <VerifiedOutlinedIcon />
              Approve/Reject Bills
            </button>
            <button>
              <LegendToggleOutlinedIcon />
              Progress Status
            </button>
          </div>
        </div>

        {/* <PopupContractorCard contractor={contractor} /> */}
      </div>
    </>
  );
};

const ChartComponent = () => {
  return <div className="pie_chart">pie chart</div>;
};

export const ContractorCard = ({ data }) => {
  return (
    <div className="contractor_card__container">
      <div className="information__container">
        <h2>{data?.name}</h2>

        <table>
          <tr>
            <th>Role</th>
            <td>{data?.specialization}</td>
          </tr>
          <tr>
            <th>Username</th>
            <td>{data?.username}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{data?.email}</td>
          </tr>
          <tr>
            <th>Contact</th>
            <td>{data?.phone_number}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{data?.description}</td>
          </tr>
        </table>

        {/* <div className="button">
          <button onClick={() => dispatch(onContractorTape())}>
            Show Details
          </button>
        </div> */}
      </div>

      <div className="image__container">
        <img src={data?.img_url} alt="contractor" />
      </div>
    </div>
  );
};

export default SiteDetail;
