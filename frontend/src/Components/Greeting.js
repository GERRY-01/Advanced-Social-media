// src/Components/Greeting.js
import React, { Component } from "react";
import { FaVideo, FaImage } from "react-icons/fa";
import "./Greeting.css";

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostModal: false,
      postText: "",
      imageFile: null,
      videoFile: null
    };
  }

  handleInputClick = () => {
    this.setState({ showPostModal: true });
  };

  handleCloseModal = () => {
    this.setState({
      showPostModal: false,
      postText: "",
      imageFile: null,
      videoFile: null
    });
  };

  handleTextChange = (e) => {
    this.setState({ postText: e.target.value });
  };

  handleImageChange = (e) => {
    this.setState({ imageFile: e.target.files[0] });
  };

  handleVideoChange = (e) => {
    this.setState({ videoFile: e.target.files[0] });
  };

  handlePost = () => {
    console.log("Posting:", this.state.postText, this.state.imageFile, this.state.videoFile);
    this.handleCloseModal();
  };

  render() {
    const { showPostModal, postText } = this.state;

    return (
      <div className="greeting-container">
        {/* Profile + Start a Post */}
        <div className="start-post">
          <div className="profile-section">
            <img
              src="https://picsum.photos/seed/profile/60"
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">Gerry</span>
          </div>
          <input
            type="text"
            placeholder="Start a post"
            className="post-input"
            readOnly
            onClick={this.handleInputClick}
          />
        </div>

        {/* Create Post Modal */}
        {showPostModal && (
          <div className="post-modal" role="dialog" aria-modal="true">
            <div className="post-modal-content">
              <h2 className="modal-title">Create a Post</h2>

              <div className="modal-profile">
                <img
                  src="https://picsum.photos/seed/profile/60"
                  alt="Profile"
                  className="profile-pic"
                />
                <span className="modal-username">Gerry</span>
              </div>

              <textarea
                placeholder="What's on your mind Gerry?"
                value={postText}
                onChange={this.handleTextChange}
                className="post-textarea"
              />

              <div className="file-icons">
                <label title="Add image">
                  <FaImage className="file-icon image-icon" />
                  <input type="file" accept="image/*" onChange={this.handleImageChange} hidden />
                </label>
                <label title="Add video">
                  <FaVideo className="file-icon video-icon" />
                  <input type="file" accept="video/*" onChange={this.handleVideoChange} hidden />
                </label>
              </div>

              <div className="modal-buttons">
                <button className="post-btn" onClick={this.handlePost}>Post</button>
                <button className="cancel-btn" onClick={this.handleCloseModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Greeting;
