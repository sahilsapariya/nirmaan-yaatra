import React, { useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/addbill_icon.png";
import "../styles/AddSite.scss";
import Form from "../common/Form";
import { useDispatch } from "react-redux";
import { baseurl } from "../../config";
import { fetchProjects } from "../../features/projects/projectSlice";
import { postData } from "../../api/apis";
import { useNavigate, useParams } from "react-router-dom";

const AddBill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { siteId } = useParams();

  const initialFormData = {
    name: { label_name: "Name", value: "", type: "text", pl: "Item Name" },
    dealer_name: {
      label_name: "Dealer",
      value: "",
      type: "text",
      pl: "Name of The Dealer",
    },
    dealer_phone: {
      label_name: "Dealer Contact",
      value: "",
      type: "tel",
      pl: "Phone number of The Dealer",
    },
    amount: {
      label_name: "Bill Amount",
      value: 0,
      type: "number",
      pl: "10000",
    },
    date: { label_name: "Bill Date", value: "", type: "date", pl: "Location" },
    description: {
      label_name: "Description",
      value: "",
      type: "text",
      pl: "Description",
    },
    category: {
      label_name: "Category",
      value: "",
      type: "select",
      pl: "Category",
      optionDefault: "--select--",
      options: ["Electricity", "Water", "Concrete", "Steel"],
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataKeyValueForAPI = {};
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      formDataKeyValueForAPI[fieldName] = fieldData.value;
    });

    await postData(`${baseurl}/api/v1/bills/`, formDataKeyValueForAPI);

    dispatch(fetchProjects());
    navigate(`/site/${siteId}/site-detail/concrete`);
    Object.values(formData).forEach((data) => {
      data.value = null;
    });
  };

  return (
    <>
      <Navbar />
      <div className="add_site_container">
        <div className="add_site_image_container">
          <img src={illustration} alt="Site Related" />
        </div>
        <Form
          RedText="Add"
          NormalText="Bill"
          button_label="Apply"
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialFormData}
        />
      </div>
    </>
  );
};

export default AddBill;
