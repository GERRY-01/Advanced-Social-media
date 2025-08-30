// src/Components/Sidebar.js
import React, { Component } from "react";
import {
  FaUserFriends,
  FaVideo,
  FaEnvelope,
  FaRobot,
  FaUser,
  FaCog,
  FaSignOutAlt, 
} from "react-icons/fa";
import "./Sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Sidebar extends Component {
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
  logout() {
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
    return (
      <div className="sidebar">
        <div className="profile">
          <img
            src={this.state.profile_pic}
            alt="profile"
            className="profile-pic"
          />
          <h3 className="profile-name">{this.state.username}</h3>
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
          <Link to="/profile">
            <FaUser className="icon" />
            Profile
          </Link>
          <a href="#settings">
            <FaCog className="icon" />
            Settings
          </a>
          <a href="/login" onClick={(e) => { e.preventDefault(); this.logout()} }>
            <FaSignOutAlt className="icon" />
            Logout
          </a>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
