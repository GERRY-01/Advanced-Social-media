import React, { Component } from "react";
import MobileMenu from "./MobileMenu";
import {
  FaHome,
  FaVideo,
  FaUserFriends,
  FaEnvelope,
  FaCog,
  FaSearch,
  FaGlobe
} from "react-icons/fa";
import "./Navbar.css";
import Sidebar from "./Sidebar";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "home", // default active icon
      sidebarOpen: false
    };
  }

  setActive = (name) => {
    this.setState({ active: name });
  };
  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    const { active } = this.state;

    return (

      <nav className="navbar">
        <MobileMenu isOpen={this.state.sidebarOpen} toggleMenu={this.toggleSidebar}/>
        {/* Top row: logo + search (mobile) */}
        <div className="top-row">
          <div className="logo">
            <FaGlobe className="logo-icon" />
            SocialApp
          </div>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        {/* Bottom row: navigation icons + hamburger */}
        <div className="nav-row">
          <div className="nav-icons">
            <div
              className={`nav-item ${active === "home" ? "active" : ""}`}
              onClick={() => this.setActive("home")}
            >
              <FaHome size={25} />
            </div>
            <div
              className={`nav-item ${active === "videos" ? "active" : ""}`}
              onClick={() => this.setActive("videos")}
            >
              <FaVideo size={25} />
            </div>
            <div
              className={`nav-item ${active === "followers" ? "active" : ""}`}
              onClick={() => this.setActive("followers")}
            >
              <FaUserFriends size={25} />
            </div>
            <div
              className={`nav-item ${active === "messages" ? "active" : ""}`}
              onClick={() => this.setActive("messages")}
            >
              <FaEnvelope size={25} />
            </div>
            <div
              className={`nav-item ${active === "settings" ? "active" : ""}`}
              onClick={() => this.setActive("settings")}
            >
              <FaCog size={25} />
            </div>

            {/* Hamburger as last nav item */}
            <div className="nav-item hamburger" onClick={this.toggleSidebar}> 
              &#9776;
            </div>
          </div>
        </div>


        {/* Profile (desktop/iPad only) */}
        <div className="profile">
          <img
            src="https://i.guim.co.uk/img/static/sys-images/Sport/Pix/pictures/2009/6/11/1244745896731/David-Villa-001.jpg?width=465&dpr=1&s=none&crop=none"
            alt="profile"
            className="profile-pic"
          />
          <span className="username">Gerry</span>
        </div>
      </nav>
    );
  }
}

export default Navbar;