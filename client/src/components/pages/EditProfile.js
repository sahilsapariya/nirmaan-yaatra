import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/profileImage.png";
import "../styles/AddSite.scss";
import Form from "../common/Form";
import { baseurl } from "../../config";
import { useNavigate } from "react-router-dom";
import { getData, patchData } from "../../api/apis";

const EditProfile = () => {
  const navigate = useNavigate();

  const [contractorData, setContractorData] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(
          `${baseurl}/api/v1/contractors/${
            JSON.parse(localStorage.getItem("user")).id
          }/`
        );
        setContractorData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (contractorData) {
      const initialFormData = {
        name: {
          label_name: "Name",
          value: contractorData?.name,
          type: "text",
          pl: "Name",
        },
        email: {
          label_name: "Email",
          value: contractorData?.email,
          type: "text",
          pl: "Email",
        },
        phone_number: {
          label_name: "Contact",
          value: contractorData?.phone_number,
          type: "text",
          pl: "Contact",
        },
        img_url: {
          label_name: "Edit Image",
          value: contractorData?.img_url,
          type: "url",
          pl: "Edit Image Image",
        },
      };
      setFormData(initialFormData);
    }
  }, [contractorData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataKeyValueForAPI = {};
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      formDataKeyValueForAPI[fieldName] = fieldData.value;
    });

    const response = await patchData(
      `${baseurl}/api/v1/contractors/${
        JSON.parse(localStorage.getItem("user")).id
      }/`,
      formDataKeyValueForAPI
    );

    // dispatch(fetchProjects());

    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <div className="add_site_container">
        <div className="add_site_image_container">
          <img
            src={formData?.img_url.value || illustration}
            alt="Site Related"
            style={{
              borderRadius: "50%",
              width: "25rem",
              height: "25rem",
            }}
          />
        </div>
        <Form
          RedText="Edit"
          NormalText="Profile"
          button_label="Save Profile"
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </>
  );
};

export default EditProfile;
