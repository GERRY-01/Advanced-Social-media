// src/Components/Greeting.js
import React, { Component } from "react";
import { FaVideo, FaImage } from "react-icons/fa";
import "./Greeting.css";
import axios from "axios";

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostModal: false,
      postText: "",
      imageFile: null,
      videoFile: null,
      username: "",
      profile_pic: ""
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
  const { postText, imageFile, videoFile } = this.state;
  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    this.setState({ error: "User not found, register first" });
    return;
  }

  const formData = new FormData();
  formData.append("caption", postText);
  formData.append("user_id", user_id); 
  if (imageFile) formData.append("image", imageFile);
  if (videoFile) formData.append("video", videoFile);

  axios
    .post("http://127.0.0.1:8000/createpost?user_id="+user_id+"", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      console.log("Post created:", response.data);
      this.handleCloseModal(); // <-- close only after success
    })
    .catch((error) => {
      console.error("Error creating post:", error.response?.data || error);
      this.setState({ error: "Failed to create post" });
    });
};

  render() {
    const { showPostModal, postText } = this.state;

    return (
      <div className="greeting-container">
        {/* Profile + Start a Post */}
        <div className="start-post">
          <div className="profile-section">
            <img
              src={this.state.profile_pic}
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">{this.state.username}</span>
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
                  src={this.state.profile_pic}
                  alt="Profile"
                  className="profile-pic"
                />
                <span className="modal-username">{this.state.username}</span>
              </div>

              <textarea
                placeholder= {`What's on your mind ${this.state.username}?`}
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
