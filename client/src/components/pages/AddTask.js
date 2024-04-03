import React, { useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/addbill_icon.png";
import "../styles/AddSite.scss";
import Form from "../common/Form";
import { useDispatch } from "react-redux";
import { baseurl } from "../../config";
import { postData } from "../../api/apis";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTask } from "../../features/site/taskSlice";


const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { siteId, specialization } = useParams();

  const initialFormData = {
    name: { label_name: "Name", value: "", type: "text", pl: "Item Name" },

    description: {
      label_name: "Description",
      value: "",
      type: "text",
      pl: "Description",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataKeyValueForAPI = {};
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      formDataKeyValueForAPI[fieldName] = fieldData.value;
    });

    formDataKeyValueForAPI["category"] = specialization;
    formDataKeyValueForAPI["project"] = siteId;

    await postData(`${baseurl}/api/v1/tasks/`, formDataKeyValueForAPI);

    dispatch(fetchTask(`${baseurl}/api/v1/projects/${siteId}/tasks/`));
    navigate(`/site/${siteId}/site-detail/${specialization}`);
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
          NormalText="Task"
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

export default AddTask;
