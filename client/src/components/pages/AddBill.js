import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import illustration from "../../assets/images/addbill_icon.png";
import "../styles/AddSite.scss";
import Form from '../common/Form';

const AddSite = () => {
    const initialFormData = {
        name: { label_name: 'Name', value: '', type: 'text', pl: 'Item Name' },
        dealer: { label_name: 'Dealer', value: '', type: 'email', pl: 'Name of The Dealer' },
        billAmount: { label_name: 'Bill Amount', value: '', type: 'number', pl: '10000' },
        billDate: { label_name: 'Bill Date', value: '', type: 'date', pl: 'Location' },
        description: { label_name: 'Description', value: '', type: 'text', pl: 'Description' },
        billDoc: { label_name: 'Bill Doc', value: '', type: 'url', pl: 'Bill URL' },
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
                <Form RedText="Add" NormalText="Bill" button_label="Apply" handleSubmit={handleSubmit}
                    formData={formData} setFormData={setFormData} initialFormData={initialFormData} />

            </div>
        </>
    );
}

export default AddSite;