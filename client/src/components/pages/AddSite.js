import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import illustration from "../../assets/images/addsite_icon.png";
import "../styles/AddSite.scss";
import Form from '../common/Form';

const AddSite = () => {
    const initialFormData = {
        name: { label_name: 'Name', value: '', type: 'text', pl: 'Name' },
        clientName: { label_name: 'Client Name', value: '', type: 'text', pl: 'Client Name' },
        budget: { label_name: 'Budget', value: '', type: 'number', pl: 'Budget' },
        constructionType: { label_name: 'Construction Type', value: '', type: 'select', pl: 'Construction Type', options: ['Building', 'Tenament', 'Other'], optionDefault: 'Select' },
        location: { label_name: 'Location', value: '', type: 'text', pl: 'Location' },
        description: { label_name: 'Description', value: '', type: 'text', pl: 'Description' },
        image: { label_name: 'Image', value: '', type: 'url', pl: 'Image' }
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
                    NormalText="Site"
                    button_label="Add Site"
                    handleSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    initialFormData={initialFormData} />

            </div>
        </>
    );
}

export default AddSite;