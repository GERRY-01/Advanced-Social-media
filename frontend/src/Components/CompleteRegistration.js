import React, { Component } from "react";
import { FaUser, FaInfoCircle, FaPhone, FaMapMarkerAlt, FaImage } from "react-icons/fa";
import "./CompleteRegistration.css";

class CompleteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      bio: "",
      phone: "",
      location: ""
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
    console.log(this.state);
  };

  render() {
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
