// src/Components/Posts.js
import React, { Component } from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import {
  FaThumbsUp,
  FaCommentAlt,
  FaShare
} from "react-icons/fa";
import "./Posts.css";
import axios from "axios";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      profile_pic: "",
      posts: [],
      openMenuId: null,
      editingPost: null,      
      editedCaption: "",      
      editedImage: null,  
      editedVideo: null 
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      axios
        .get(`http://127.0.0.1:8000/getposts?user_id=${user_id}`)
        .then((response) => {
          const {posts } = response.data;
          this.setState({ posts });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }

handletime(timestamp){
  const now = new Date();
  const postDate = new Date(timestamp);
  const timeDifference = Math.floor((now - postDate) / 1000);

  if (timeDifference < 60) {
    return timeDifference === 1 ? "1 second ago" : `${timeDifference} seconds ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
}

toggleMenu(postId) {
  if (this.state.openMenuId === postId) {
    this.setState({ openMenuId: null });
  } else {
    this.setState({ openMenuId: postId });
  }
}

deletePost(postId) {
  axios
    .delete(`http://127.0.0.1:8000/deletepost/${postId}`)
    .then(() => {
      this.fetchPosts();
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
}
editPost(post) {
  this.setState({
    editingPost: post,
    editedCaption: post.caption,
    editedImage: null,
    editedVideo: null
  });
}
submitEditedPost =(post) => {
  const { editingPost, editedCaption, editedImage, editedVideo } = this.state;
  const formData = new FormData();
  formData.append("caption", editedCaption);
  if (editedImage) {
    formData.append("image", editedImage);
  }
  if (editedVideo) {
    formData.append("video", editedVideo);
  }
    axios.put(`http://127.0.0.1:8000/editpost/${editingPost.id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(() => {
      this.fetchPosts();
      this.setState({ editingPost: null });
    })
    .catch((error) => {
      console.error("Error editing post:", error);
    });
  
}

  render() { 
    return (
      <div className="posts-container">
        {this.state.posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img
                src={post.user.profile_pic}
                alt={post.user.username}
                className="post-profile-pic"
              />
              <div>
                <span className="post-username">{post.user.username}</span>
                <span className="post-time">{this.handletime(post.time)}</span>
              </div>

                    {/* Three dots button */}
                      <div className="post-menu-wrapper">
                        <span className="three-dots" onClick={() => this.toggleMenu(post.id)}>⋮</span>

                        {/* Conditional menu */}
                        {this.state.openMenuId === post.id && (
                          <div className="post-menu">
                            <div className="post-menu-item" onClick={() => this.editPost(post)}>Edit</div>
                            <div className="post-menu-item" onClick={() => this.deletePost(post.id)}>Delete</div>
                          </div>
                        )}
                      </div>

            </div>

            <div className="post-caption">{post.caption}</div>

            {post.image && <img src={post.image} alt="Post" className="post-image" />}

            {post.video && <video src={post.video} controls className="post-image" />}

            <div className="post-actions">
              <div className="post-action">
                <FaThumbsUp className="post-icon" /> {post.likes} Likes
              </div>
              <div className="post-action">
                <FaCommentAlt className="post-icon" /> {post.comments} Comments
              </div>
              <div className="post-action">
                <FaShare className="post-icon" /> {post.shares} Shares
              </div>
            </div>
          </div>
        ))}
      
        {this.state.editingPost && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Edit Post</h3>
            <textarea
              value={this.state.editedCaption}
              onChange={(e) => this.setState({ editedCaption: e.target.value })}
            />
              <div className="edit-file-selectors">
                {/* Image selector */}
                <label className="file-icon">
                  <FaImage size={25} />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => this.setState({ editedImage: e.target.files[0] })}
                  />
                </label>

                {/* Video selector */}
                <label className="file-icon">
                  <FaVideo size={25} />
                  <input
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={(e) => this.setState({ editedVideo: e.target.files[0] })}
                  />
                </label>
              </div>

            <button onClick={this.submitEditedPost}>Save Changes</button>
            <button onClick={() => this.setState({ editingPost: null })}>Cancel</button>
          </div>
        </div>
      )}
      </div>
    );
  }
}

export default Posts;
