import React, { useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/addsite_icon.png";
import "../styles/AddSite.scss";
import Form from "../common/Form";
import { baseurl } from "../../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../../features/projects/projectSlice";
import { postData } from "../../api/apis";

const AddSite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormData = {
    project_name: {
      label_name: "Site Name",
      value: "",
      type: "text",
      pl: "Name",
    },
    client_name: {
      label_name: "Client Name",
      value: "",
      type: "text",
      pl: "Client Name",
    },
    budget: { label_name: "Budget", value: "", type: "number", pl: "Budget" },
    // constructionType: {
    //   label_name: "Construction Type",
    //   value: "",
    //   type: "select",
    //   pl: "Construction Type",
    //   options: ["Building", "Tenament", "Other"],
    //   optionDefault: "Select",
    // },
    location: {
      label_name: "Location",
      value: "",
      type: "text",
      pl: "Location",
    },
    city: { label_name: "City", value: "", type: "text", pl: "City" },
    description: {
      label_name: "Description",
      value: "",
      type: "text",
      pl: "Description",
    },
    img_url: { label_name: "Image", value: "", type: "url", pl: "Image" },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataKeyValueForAPI = {};
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      formDataKeyValueForAPI[fieldName] = fieldData.value;
    });

    const response = await postData(
      `${baseurl}/api/v1/projects/`,
      "POST",
      formDataKeyValueForAPI
    );

    dispatch(fetchProjects());

    navigate("/admin-home");
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
          NormalText="Site"
          button_label="Add Site"
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialFormData}
        />
      </div>
    </>
  );
};

export default AddSite;
