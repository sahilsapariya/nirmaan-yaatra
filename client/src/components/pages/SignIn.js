import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/SignUp.css"
import buldingImage from '../../images/img_construction.png'

const options = [
    { label: "Admin", value: "admin" },
    { label: "Contractor", value: "contractor" },
];


function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.error('Done!');
            } else {
                console.log(formData)
                console.error('API call failed');
                navigate("/sign-in")
            }
        } catch (error) {
            console.error('Error during API call', error);
        }
    };

    return (
        <>
            <div className="signup__container">
                <div className='signup__inner_container'>
                    <div className='signup__building_image'>
                        <img src={buldingImage} alt='Background Image' />
                    </div>
                    <div className='signup__building_input_form'>
                        <h1 className="signup__container_heading">Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                className='signup__container_input_field'
                                placeholder='Username'
                                required />
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='signup__container_input_field'
                                placeholder='Password'
                                required />
                            <button className='button_property' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignIn;