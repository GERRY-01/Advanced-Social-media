// src/Components/Posts.js
import React, { Component } from "react";
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
      </div>
    );
  }
}

export default Posts;
