import React, { Component } from "react";
import { FaUser, FaInfoCircle, FaPhone, FaMapMarkerAlt, FaImage } from "react-icons/fa";
import "./CompleteRegistration.css";
import  axios  from "axios";
import { Navigate } from "react-router-dom";

class CompleteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      bio: "",
      phone: "",
      location: "",
      success:"",
      error:"",
      redirect: false
    };
  }

  handleImageChange = (e) => {
    this.setState({ profilePicture: e.target.files[0] });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePicture", this.state.profilePicture);
    formData.append("bio", this.state.bio);
    formData.append("phone", this.state.phone);
    formData.append("location", this.state.location);

    axios.post("http://127.0.0.1:8000/completeregistration", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      console.log(res.data);
      this.setState({ success: "Registration completed successfully" });
      this.setState({ redirect: true });
    }).catch(err => {
      console.error(err);
      this.setState({ error: "Registration failed" });
    });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="complete-registration">
        <h2>Complete Your Registration</h2>
        <form onSubmit={this.handleSubmit} className="registration-form">
          
          {/* Profile Picture */}
          <div className="form-group file-upload">
            <label htmlFor="profilePicture">
              <FaImage className="icon" /> Upload Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={this.handleImageChange}
              hidden
            />
          </div>

          {/* Bio */}
          <div className="form-group">
            <label>
              <FaInfoCircle className="icon" /> Bio / About Me
            </label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Tell us something about yourself..."
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>
              <FaPhone className="icon" /> Phone Number
            </label>
            <input
              type="text"
              name="phone"
              className="complete-registration-input"
              placeholder="Enter your phone number"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>
              <FaMapMarkerAlt className="icon" /> Location
            </label>
            <input
              type="text"
              name="location"
              className="complete-registration-input"
              placeholder="City, Country"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">Save</button>
        </form>
      </div>
    );
  }
}

export default CompleteRegistration;
