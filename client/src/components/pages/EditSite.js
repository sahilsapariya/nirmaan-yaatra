import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/addsite_icon.png";
import "../styles/AddSite.scss";
import Form from "../common/Form";
import { baseurl } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../../features/projects/projectSlice";
import { getData, patchData } from "../../api/apis";

const EditSite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { siteId } = useParams();

  const [siteData, setSiteData] = useState(null);
  const [formData, setFormData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(`${baseurl}/api/v1/projects/${siteId}/`);
        setSiteData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [siteId]);

  useEffect(() => {
    if (siteData) {
      const initialFormData = {
        project_name: {
          label_name: "Site Name",
          value: siteData.project_name,
          type: "text",
          pl: "Name",
        },
        client_name: {
          label_name: "Client Name",
          value: siteData.client_name,
          type: "text",
          pl: "Client Name",
        },
        budget: {
          label_name: "Budget",
          value: siteData.budget,
          type: "number",
          pl: "Budget",
        },
        location: {
          label_name: "Location",
          value: siteData.location,
          type: "text",
          pl: "Location",
        },
        city: {
          label_name: "City",
          value: siteData.city,
          type: "text",
          pl: "City",
        },
        description: {
          label_name: "Description",
          value: siteData.description,
          type: "text",
          pl: "Description",
        },
        img_url: {
          label_name: "Image",
          value: siteData.img_url,
          type: "url",
          pl: "Image",
        },
        status: {
          label_name: "Status",
          value: siteData.status,
          type: "select",
          options: ["pending", "in_progress", "completed"],
          optionDefault: "--select--",
          pl: "Select status",
        },
      };
      setFormData(initialFormData);
    }
  }, [siteData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataKeyValueForAPI = {};
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      if (fieldName === "budget")
        formDataKeyValueForAPI[fieldName] = parseFloat(fieldData.value);
      else formDataKeyValueForAPI[fieldName] = fieldData.value;
    });

    await patchData(
      `${baseurl}/api/v1/projects/${siteId}/`,
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
          RedText="Edit"
          NormalText="Site"
          button_label="Save Details"
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </>
  );
};

export default EditSite;
