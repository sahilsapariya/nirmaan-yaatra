import React from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './../styles/Navbar.css'
const Navbar = () => {
  return (
    <>
      <div className="navbar__Heading">
        <div className='navbar__logo_Name'>
          Niramaanyatra
        </div>
        <div className='navbar__navigation'>
          <div className='navbar__button'>
            <button className='navbar__add_site_button'>
              <ControlPointIcon/>
              <span className='button_text'>
                  Add Site
              </span>
            </button>
          </div>
          <div className='navbar__profile'>
            <button className='navbar__profile_button'>
              <AccountCircleIcon/>
            </button> 
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar