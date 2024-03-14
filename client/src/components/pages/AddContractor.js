import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import illustration from "../../assets/images/addcontractor_icon.png";
import "../styles/AddSite.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSite } from "../../features/site/siteSlice";
import { baseurl } from "../../config";
import { postData } from "../../api/apis";
import { fetchProjects } from "../../features/projects/projectSlice";
import { fields } from "../../data/Data";


const AddContractor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { siteId } = useParams();

  const projectList = useSelector((state) => state.project.data);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    address: "",
    img_url: "",
    specialization: "",
    projects: [],
  });

  const handleProjectChange = (e) => {
    const selectedProjectIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData({
      ...formData,
      projects: selectedProjectIds,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    await postData(`${baseurl}/api/v1/contractors/`, formData);

    dispatch(fetchSite(`${baseurl}/api/v1/projects/${siteId}/`));
    navigate(`/site/${siteId}`);
  };

  useEffect(() => {
    if (!projectList) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projectList]);

  return (
    <>
      <Navbar />
      <div className="add_site_container">
        <div className="add_site_image_container">
          <img src={illustration} alt="Site Related" />
        </div>
        <div className="add_site_form_container">
          <div className="sites__heading">
            <span className="heading_red_color">Add</span> Contractor
          </div>
          <form onSubmit={handleSubmit}>
            <div className="add_site_form_element">
              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="add_site_form_element">
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="add_site_form_element">
              <label>Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="add_site_form_element">
              <label>Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="add_site_form_element">
              <label>Phone number</label>
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                type="tel"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="add_site_form_element">
              <label>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                placeholder="Enter address"
                required
              />
            </div>
            <div className="add_site_form_element">
              <label>Img Url</label>
              <input
                name="img_url"
                value={formData.img_url}
                onChange={handleChange}
                type="url"
                placeholder="Enter image url"
                required
              />
            </div>
            <div className="add_site_form_element">
              <label>Specialization</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <option value="">--select--</option>
                {fields.map((field, index) => {
                  return (
                    <option key={index} value={field.slug}>
                      {field.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="add_site_form_element">
              <label>Projects</label>
              <select
                multiple
                className="add_site_select"
                onChange={handleProjectChange}
                style={{
                  color: "black",
                }}
              >
                {projectList?.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.project_name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Save Details</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContractor;
