// MobileMenu.js
import React, { Component } from "react";
import './MobileMenu.css';
import {
  FaUserFriends,
  FaVideo,
  FaEnvelope,
  FaRobot,
  FaUser,
  FaCog
} from "react-icons/fa";

class MobileMenu extends Component {
  render() {
    const { isOpen, toggleMenu } = this.props;

    return (
      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}>
        {/* Close button */}
        <span className="close-btn" onClick={toggleMenu}>
          &times;
        </span>

        {/* Profile */}
        <div className="profile-section">
          <img
            src="https://i.guim.co.uk/img/static/sys-images/Sport/Pix/pictures/2009/6/11/1244745896731/David-Villa-001.jpg?width=465&dpr=1&s=none&crop=none"
            alt="profile"
            className="profile-pic"
          />
          <span className="profile-name">Gerry</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><FaUserFriends /> Followers</li>
          <li><FaVideo /> Videos</li>
          <li><FaEnvelope /> Messages</li>
          <li><FaRobot /> AI Chatbot</li>
          <li><FaUser /> Profile</li>
          <li><FaCog /> Settings</li>
        </ul>
      </div>
    );
  }
}

export default MobileMenu;
