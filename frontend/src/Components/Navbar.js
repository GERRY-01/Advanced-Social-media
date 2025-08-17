import React, { Component } from "react";
import MobileMenu from "./MobileMenu";
import {
  FaHome,
  FaVideo,
  FaUserFriends,
  FaEnvelope,
  FaCog,
  FaSearch,
  FaGlobe,
} from "react-icons/fa";
import "./Navbar.css";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "home", // default active icon
      sidebarOpen: false,
      username: "",
      profile_pic: "",
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      axios
        .get(`http://127.0.0.1:8000/userdata?user_id=${user_id}`)
        .then((response) => {
          const { username, profile_pic } = response.data;
          this.setState({ username, profile_pic, loading: false });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.setState({ loading: false, error: "Failed to load user data" });
        });
    }
  }

  setActive = (name) => {
    this.setState({ active: name });
  };

  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    const { active, loading, error, username, profile_pic } = this.state;

    return (
      <nav className="navbar">
        <MobileMenu isOpen={this.state.sidebarOpen} toggleMenu={this.toggleSidebar} />

        {/* Top row: logo + search */}
        <div className="top-row">
          <div className="logo">
            <FaGlobe className="logo-icon" /> SocialApp
          </div>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        {/* Bottom row: navigation icons */}
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

            {/* Hamburger */}
            <div className="nav-item hamburger" onClick={this.toggleSidebar}>
              &#9776;
            </div>
          </div>
        </div>

        {/* Profile section */}
        <div className="profile">
          {loading ? (
            <span>Loading...</span>
          ) : error ? (
            <span className="error">{error}</span>
          ) : (
            <>
              <img src={profile_pic} alt="profile" className="profile-pic" />
              <span className="username">{username}</span>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
