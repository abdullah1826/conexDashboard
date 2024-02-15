import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaUser } from 'react-icons/fa';
import { IoIosPeople } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NavbarFooter() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <>
      <div className='footer'>
        <Link to='/home' className={`icon-nav ${activeLink === '/home' ? 'active' : ''}`} onClick={() => handleLinkClick('/home')}>
          <FaUser style={{ fontSize: '22px', color: activeLink === '/home' ? 'black' : '8E8E8E' }} />
        </Link>
        <Link to='/subteams' className={`icon-nav ${activeLink === '/subteams' ? 'active' : ''}`} onClick={() => handleLinkClick('/subteams')}>
          <IoIosPeople style={{ fontSize: '30px', color: activeLink === '/subteams' ? 'black' : '8E8E8E' }} />
        </Link>
        <Link to='/leads' className={`icon-nav ${activeLink === '/leads' ? 'active' : ''}`} onClick={() => handleLinkClick('/leads')}>
          <FaFilter style={{ fontSize: '22px', color: activeLink === '/leads' ? 'black' : '8E8E8E'}} />
        </Link>
        <Link to='/analytics' className={`icon-nav ${activeLink === '/analytics' ? 'active' : ''}`} onClick={() => handleLinkClick('/analytics')}>
          <SiGoogleanalytics style={{ fontSize: '22px', color: activeLink === '/analytics' ? 'black' : '8E8E8E' }} />
        </Link>
        <Link to='/company' className={`icon-nav ${activeLink === '/company' ? 'active' : ''}`} onClick={() => handleLinkClick('/company')}>
          <BsFillBuildingsFill style={{ fontSize: '22px', color: activeLink === '/company' ? 'black' : '8E8E8E' }} />
        </Link>
      </div>
    </>
  );
}
