// MobileMenu.js
import React, { Component, use } from "react";
import './MobileMenu.css';
import {
  FaUserFriends,
  FaVideo,
  FaEnvelope,
  FaRobot,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      profile_pic: "",
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
          this.setState({ username, profile_pic });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }

  logout_user =(e)=>{
    e.preventDefault();
    axios
    .post("http://127.0.0.1:8000/logout")
    .then(() => {
      localStorage.removeItem("user_id");
      console.log("Logout successful");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
  }

  render() {
    const { isOpen, toggleMenu } = this.props;

    return (
      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}>
        {/* Close button */}
        <span className="mobile-close-btn" onClick={toggleMenu}>
          &times;
        </span>

        {/* Profile */}
        <div className="profile-section">
          <img
            src={this.state.profile_pic}
            alt="profile"
            className="profile-pic"
          />
          <span className="profile-name">{this.state.username}</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><FaUserFriends /> Followers</li>
          <li><FaVideo /> Videos</li>
          <li><FaEnvelope /> Messages</li>
          <li><FaRobot /> AI Chatbot</li>
          <li><FaUser /> Profile</li>
          <li><FaCog /> Settings</li>
          <li onClick={this.logout_user}><FaSignOutAlt /> Logout</li>
        </ul>
      </div>
    );
  }
}

export default MobileMenu;