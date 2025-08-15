// src/Components/Sidebar.js
import React, { Component } from "react";
import {
  FaUserFriends,
  FaVideo,
  FaEnvelope,
  FaRobot,
  FaUser,
  FaCog
} from "react-icons/fa";
import "./Sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="profile">
          <img
            src="https://i.guim.co.uk/img/static/sys-images/Sport/Pix/pictures/2009/6/11/1244745896731/David-Villa-001.jpg?width=465&dpr=1&s=none&crop=none"
            alt="profile"
            className="profile-pic"
          />
          <h3 className="profile-name">Gerry</h3>
        </div>

        <nav className="nav-links">
          <a href="#followers">
            <FaUserFriends className="icon" />
            Followers
          </a>
          <a href="#videos">
            <FaVideo className="icon" />
            Videos
          </a>
          <a href="#messages">
            <FaEnvelope className="icon" />
            Messages
          </a>
          <a href="#ai-chatbot">
            <FaRobot className="icon" />
            AI Chatbot
          </a>
          <a href="#profile">
            <FaUser className="icon" />
            Profile
          </a>
          <a href="#settings">
            <FaCog className="icon" />
            Settings
          </a>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
