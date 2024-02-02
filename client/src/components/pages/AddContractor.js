import React, { useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/addcontractor_icon.png";
import "../styles/AddSite.scss";
import Form from "../common/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSite } from "../../features/site/siteSlice";
import { createData } from "../../hooks/CustomHooks";
import { baseurl } from "../../config";

const AddContractor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projects = useState(useSelector((state) => state.project.data));
  console.log(projects[0]);

  const { siteId } = useParams();

  const initialFormData = {
    name: { label_name: "Name", value: "", type: "text", pl: "Name" },
    email: {
      label_name: "Email",
      value: "",
      type: "email",
      pl: "abc@gmail.com",
    },
    username: {
      label_name: "Username",
      value: "",
      type: "text",
      pl: "Username",
    },
    phone_number: {
      label_name: "Contact No.",
      value: "",
      type: "number",
      pl: "+91-1234567890",
    },
    address: { label_name: "Address", value: "", type: "text", pl: "Address" },
    password: {
      label_name: "Password",
      value: "",
      type: "password",
      pl: "Enter Password",
    },
    // description: { label_name: 'Description', value: '', type: 'text', pl: 'Description' },
    img_url: { label_name: "Image", value: "", type: "url", pl: "Image" },
    specialization: {
      label_name: "Specialization",
      value: "",
      type: "text",
      pl: "Specialization",
    },
    // projects: {
    //     label_name: "Projects",
    //     value: "",
    //     type: "select",
    //     pl: "Projects",
    //     options: projects?.map(project => project.project_name),
    //     optionDefault: "Select",
    //   },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataKeyValueForAPI = {};
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      formDataKeyValueForAPI[fieldName] = fieldData.value;
    });

    formDataKeyValueForAPI["projects"] = projects[0].filter(project => project.id == siteId)[0];

    console.log(formDataKeyValueForAPI["projects"])

    console.log(formDataKeyValueForAPI);
    const response = await createData(
      `${baseurl}/api/v1/contractors/`,
      formDataKeyValueForAPI
    );

    dispatch(fetchSite(`${baseurl}/api/v1/projects/${siteId}/`));
    navigate(`/site/${siteId}`);
  };

  return (
    <>
      <Navbar />
      <div className="add_site_container">
        <div className="add_site_image_container">
          <img src={illustration} alt="Site Related Image" />
        </div>
        <Form
          RedText="Add"
          NormalText="Contractor"
          button_label="Add Contractor"
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialFormData}
        />
      </div>
    </>
  );
};

export default AddContractor;
