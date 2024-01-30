import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import illustration from "../../assets/images/addcontractor_icon.png";
import "../styles/AddSite.scss";
import Form from '../common/Form';

const AddSite = () => {
    const initialFormData = {
        name: { label_name: 'Name', value: '', type: 'text', pl: 'Name' },
        email: { label_name: 'Email', value: '', type: 'email', pl: 'abc@gmail.com' },
        username: { label_name: 'Username', value: '', type: 'text', pl: 'Username' },
        contactInfo: { label_name: 'Contact No.', value: '', type: 'number', pl: '+91-1234567890' },
        location: { label_name: 'Location', value: '', type: 'text', pl: 'Location' },
        Password: { label_name: 'Password', value: '', type: 'password', pl: 'Enter Password' },
        description: { label_name: 'Description', value: '', type: 'text', pl: 'Description' },
        image: { label_name: 'Image', value: '', type: 'url', pl: 'Image' },
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formDataKeyValueForAPI = {};
        Object.entries(formData).forEach(([fieldName, fieldData]) => {
            formDataKeyValueForAPI[fieldName] = fieldData.value;
        });
        console.log(formDataKeyValueForAPI);
    };

    return (
        <>
            <Navbar />
            <div className="add_site_container">
                <div className="add_site_image_container">
                    <img src={illustration} alt='Site Related Image' />
                </div>
                <Form
                    RedText="Add"
                    NormalText="Contractor"
                    button_label="Add Contractor"
                    handleSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    initialFormData={initialFormData} />

            </div>
        </>
    );
}

export default AddSite;