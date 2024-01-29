import React from 'react'
import Navbar from '../common/Navbar'
import illustration from "../../assets/images/addsite_icon.png";
import "../styles/AddSite.scss";



function AddSite() {
    return (
        <>
            <Navbar />
            <div className="add_site_container">
                <div className="add_site_image_container">
                    <img src={illustration} alt='Site Realted Image' />
                </div>
                <div className='add_site_form_container'>
                    <div className="sites__heading">
                        <span className="heading_red_color">Live</span> Sites
                    </div>
                    <form>
                        <div className='add_site_form_element'>
                            <label>Name:</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='add_site_form_element'>
                            <label>Client Name:</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='add_site_form_element'>
                            <label>Budget:</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='add_site_form_element'>
                            <label>Construction Type:</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='add_site_form_element'>
                            <label>Location:</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='add_site_form_element'>
                            <label>Description:</label>
                            <input type="text" name="name" />
                        </div>
                        <div className='add_site_form_element'>
                            <label>Image:</label>
                            <input type="text" name="name" />
                        </div>
                        <button className='add_site_button'>Add Site</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default AddSite