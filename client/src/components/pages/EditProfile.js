import React, { useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/profileImage.png";
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
    name: {
      label_name: "Name",
      value: "",
      type: "text",
      pl: "Name",
    },
    email: {
      label_name: "Email",
      value: "",
      type: "text",
      pl: "Email",
    },
    Contact: {
      label_name: "Contact",
      value: "",
      type: "text",
      pl: "Contact",
    },
    description: {
      label_name: "Description",
      value: "",
      type: "text",
      pl: "Description",
    },
    editImage: {
      label_name: "Edit Image",
      value: "",
      type: "url",
      pl: "Edit Image Image",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataKeyValueForAPI = {};
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      formDataKeyValueForAPI[fieldName] = fieldData.value;
    });
    console.log(formDataKeyValueForAPI);
    // const response = await postData(
    //   `${baseurl}/api/v1/projects/`,
    //    "POST",
    //   formDataKeyValueForAPI
    // );

    // dispatch(fetchProjects());

    // navigate("/admin-home");
  };

  return (
    <>
      <Navbar />
      <div className="add_site_container">
        <div className="add_site_image_container">
          <img src={illustration} alt="Site Related" />
        </div>
        <Form
          RedText="Edit"
          NormalText="Profile"
          button_label="Save Profile"
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
