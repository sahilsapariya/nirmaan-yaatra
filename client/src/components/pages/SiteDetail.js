import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
// import Slider from "../common/Slider";
import "../styles/Site.scss";
import "../styles/SiteDetail.scss";

import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LegendToggleOutlinedIcon from "@mui/icons-material/LegendToggleOutlined";
import { fetchSite } from "../../features/site/siteSlice";
import { baseurl } from "../../config";
import { fetchBill } from "../../features/site/billSlice";
import { patchData } from "../../api/apis";
import { fetchTask } from "../../features/site/taskSlice";
import PieChart from "../common/PieChart";

const SiteDetail = () => {
  const [isBillActive, setIsBillActive] = useState(true);
  const [isProgress, setIsProgress] = useState(false);
  const dispatch = useDispatch();
  const { siteId, specialization } = useParams();
  const navigate = useNavigate();

  var site = useSelector((state) => state.site.data);
  var billDetail = useSelector((state) => state.bill.data);
  var taskDetail = useSelector((state) => state.task.data);

  var siteDetail = site?.site_details;

  useEffect(() => {
    if (!site) {
      dispatch(fetchSite(`${baseurl}/api/v1/projects/${siteId}/`));
    }
    if (!billDetail) {
      dispatch(fetchBill());
    }
    if (!taskDetail) {
      dispatch(fetchTask());
    }
  }, [dispatch, site, siteId, billDetail, taskDetail]);

  siteDetail = siteDetail?.filter(
    (category) => category.category === specialization
  );

  if (
    siteDetail?.length === 0 &&
    JSON.parse(localStorage.getItem("authTokens")).userType === "ADMIN"
  ) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "22rem",
        }}
      >
        <h1>
          No data for <span style={{ color: "red" }}> {specialization}</span>
        </h1>
        <button
          onClick={() => navigate(`/site/${siteId}`)}
          style={{
            padding: "0.5rem 3rem",
            background: "#14ce00",
            color: "#fff",
            borderRadius: "5px",
            fontSize: "large",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    );
  }

  siteDetail = siteDetail ? siteDetail[0] : null;

  return (
    <>
      <Navbar
        billButton={true}
        siteId={siteId}
        specialization={specialization}
      />
      <div className="site_detail__container">
        {JSON.parse(localStorage.getItem("authTokens")).userType === "ADMIN" ? (
          <div className="upper__container">
            {/* <Slider data={contractors} type={"contractors"} /> */}
            {siteDetail && <ContractorCard data={siteDetail.contractor} />}

            <PieChart
              labels={["1", "2"]}
              datasets={[
                {
                  data: [60, 40],
                  backgroundColor: ["#FF6384", "#36A2EB"],
                },
              ]}
            />
          </div>
        ) : (
          <div className="contractor_upper__container">
            <h1>{site?.project_name}</h1>
            <p>{site?.location}</p>
          </div>
        )}
        <div className="lower__container">
          <div className="buttons">
            <button
              onClick={() => {
                setIsBillActive(true);
                setIsProgress(false);
              }}
            >
              <VerifiedOutlinedIcon />
              {JSON.parse(localStorage.getItem("authTokens")).userType ===
              "ADMIN"
                ? "Approve/Reject Bills"
                : "Bills"}
            </button>
            <button
              onClick={() => {
                setIsBillActive(false);
                setIsProgress(true);
              }}
            >
              <LegendToggleOutlinedIcon />
              Tasks
            </button>
          </div>

          {isBillActive && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 0",
                  marginBottom: "1rem",
                }}
              ></div>

              <PendingBills
                bills={billDetail?.filter(
                  (bill) =>
                    bill.status === "pending" &&
                    bill.category === specialization
                )}
              />
              <ApprovedBills
                bills={billDetail?.filter(
                  (bill) =>
                    bill.status === "approved" &&
                    bill.category === specialization
                )}
              />
            </>
          )}
          {isProgress && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 0",
                  marginBottom: "1rem",
                }}
              ></div>
              <ConstructionProgress specialization={specialization} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const ContractorCard = ({ data }) => {
  return (
    <div className="contractor_card__container">
      <div className="information__container">
        <h2>{data?.name}</h2>

        <table>
          <tbody>
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
          </tbody>
        </table>
      </div>

      <div className="image__container">
        <img src={data?.img_url} alt="contractor" />
      </div>
    </div>
  );
};

const PendingBills = ({ bills }) => {
  return (
    <div className="bill__container">
      <div className="sites__heading">
        <span className="heading_red_color">Pending</span> Bills
      </div>
      {bills?.length !== 0 ? (
        <BillsTable data={bills} />
      ) : (
        <div>"No pending bills"</div>
      )}
    </div>
  );
};

const ApprovedBills = ({ bills }) => {
  return (
    <div className="bill__container">
      <div className="sites__heading">
        <span className="heading_red_color" style={{ color: "#808080" }}>
          Approved
        </span>{" "}
        Bills
      </div>
      {bills?.length !== 0 ? (
        <BillsTable data={bills} />
      ) : (
        <div>"No approved bills"</div>
      )}
    </div>
  );
};

const ConstructionProgress = ({ data, specialization }) => {
  return (
    <div className="bill__container">
      <div className="sites__heading">
        <span className="heading_red_color">Construction</span> Task List
      </div>
      {data?.length !== 0 ? (
        <TasksTable specialization={specialization} />
      ) : (
        <div>"No tasks"</div>
      )}
    </div>
  );
};

const BillsTable = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="table_wrapper">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Bill Information</th>
            <th>Bill Amount</th>
            <th>Bill Status</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((bill, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{bill?.name}</td>
                <td>{bill?.amount}</td>

                {JSON.parse(localStorage.getItem("authTokens")).userType ===
                "ADMIN" ? (
                  <td>
                    <select
                      value={bill?.status}
                      onChange={async (e) => {
                        e.preventDefault();
                        await patchData(
                          `${baseurl}/api/v1/bills/${bill?.id}/`,
                          {
                            status: e.target.value,
                          }
                        );

                        dispatch(fetchBill());
                      }}
                    >
                      <option value={"pending"}>pending</option>
                      <option value={"approved"}>approved</option>
                      <option value={"paid"}>paid</option>
                    </select>
                  </td>
                ) : (
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <button
                      style={{
                        padding: "2px 1rem",
                      }}
                      onClick={() => {
                        navigate(`/bill-page`);
                      }}
                    >
                      View details
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TasksTable = ({ specialization }) => {
  var taskDetail = useSelector((state) => state.task.data);
  taskDetail = taskDetail?.filter((task) => task.category === specialization);

  const dispatch = useDispatch();

  if (taskDetail?.length === 0) {
    return <div>No Tasks assigned</div>;
  }

  return (
    <div className="table_wrapper">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Task Information</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {taskDetail?.map((task, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task?.name}</td>
                <td>{task?.start_date}</td>
                <td>{task?.end_date}</td>
                <td>
                  <select
                    value={task?.is_complete}
                    onChange={async (e) => {
                      e.preventDefault();
                      await patchData(`${baseurl}/api/v1/tasks/${task?.id}/`, {
                        is_complete: e.target.value,
                      });

                      dispatch(fetchTask());
                    }}
                  >
                    <option value={"true"}>Completed</option>
                    <option value={"false"}>Pending</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SiteDetail;
