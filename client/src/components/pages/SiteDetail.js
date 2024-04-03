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

  var bills = billDetail?.filter((bill) => bill.category === specialization);
  var tasks = taskDetail?.filter((task) => task.category === specialization);

  var totalPendingBills = bills?.filter(
    (bill) => bill.status === "pending"
  ).length;
  var totalAprovedBills = bills?.filter(
    (bill) => bill.status === "approved"
  ).length;
  var totalCompletedTasks = tasks?.filter(
    (task) => task.is_complete === true
  ).length;
  var totalPendingTasks = tasks?.filter(
    (task) => task.is_complete === false
  ).length;

  var siteDetail = site?.site_details;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authTokens")).userType === "ADMIN") {
      dispatch(fetchSite(`${baseurl}/api/v1/projects/${siteId}/`));
    }
    dispatch(fetchBill(`${baseurl}/api/v1/projects/${siteId}/bills/`));
    dispatch(fetchTask(`${baseurl}/api/v1/projects/${siteId}/tasks/`));
  }, [dispatch, siteId]);

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

            <div className="site_detail_pie_chart">
              <PieChart
                labels={[
                  "Pending Tasks",
                  "Completed Tasks",
                  "Pending Bills",
                  "Approved Bills",
                ]}
                datasets={[
                  {
                    data: [
                      totalPendingTasks,
                      totalCompletedTasks,
                      totalPendingBills,
                      totalAprovedBills,
                    ],
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#FF2510",
                    ],
                  },
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="contractor_upper__container">
            <h1>{JSON.parse(localStorage.getItem("site"))?.project_name}</h1>
            <p>{JSON.parse(localStorage.getItem("site"))?.location}</p>
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
                siteId={siteId}
              />
              <ApprovedBills
                bills={billDetail?.filter(
                  (bill) =>
                    bill.status === "approved" &&
                    bill.category === specialization
                )}
                siteId={siteId}
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
              <ConstructionProgress
                specialization={specialization}
                siteId={siteId}
              />
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

const PendingBills = ({ bills, siteId }) => {
  return (
    <div className="bill__container">
      <div className="sites__heading">
        <span className="heading_red_color">Pending</span> Bills
      </div>
      {bills?.length !== 0 ? (
        <BillsTable data={bills} siteId={siteId} />
      ) : (
        <div>"No pending bills"</div>
      )}
    </div>
  );
};

const ApprovedBills = ({ bills, siteId }) => {
  return (
    <div className="bill__container">
      <div className="sites__heading">
        <span className="heading_red_color" style={{ color: "#808080" }}>
          Approved
        </span>{" "}
        Bills
      </div>
      {bills?.length !== 0 ? (
        <BillsTable data={bills} siteId={siteId} />
      ) : (
        <div>"No approved bills"</div>
      )}
    </div>
  );
};

const ConstructionProgress = ({ data, specialization, siteId }) => {
  return (
    <div className="bill__container">
      <div className="sites__heading">
        <span className="heading_red_color">Construction</span> Task List
      </div>
      {data?.length !== 0 ? (
        <TasksTable specialization={specialization} siteId={siteId} />
      ) : (
        <div>"No tasks"</div>
      )}
    </div>
  );
};

const BillsTable = ({ data, siteId }) => {
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
                          `${baseurl}/api/v1/projects/${siteId}/bills/${bill?.id}/`,
                          {
                            status: e.target.value,
                          }
                        );

                        dispatch(
                          fetchBill(
                            `${baseurl}/api/v1/projects/${siteId}/bills/`
                          )
                        );
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

const TasksTable = ({ specialization, siteId }) => {
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
                      await patchData(
                        `${baseurl}/api/v1/projects/${siteId}/tasks/${task?.id}/`,
                        {
                          is_complete: e.target.value,
                        }
                      );

                      dispatch(
                        fetchTask(`${baseurl}/api/v1/projects/${siteId}/tasks/`)
                      );
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
