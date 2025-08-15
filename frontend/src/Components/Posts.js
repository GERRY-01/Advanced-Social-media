// src/Components/Posts.js
import React, { Component } from "react";
import {
  FaThumbsUp,
  FaCommentAlt,
  FaShare
} from "react-icons/fa";
import "./Posts.css";

class Posts extends Component {
  render() {
    // Example posts (will be fetched from backend later)
    const posts = [
      {
        id: 1,
        username: "Alice Johnson",
        profilePic: "https://picsum.photos/seed/alice/50",
        time: "1 hour ago",
        caption: "Enjoying a sunny day at the beach 🌊",
        image: "https://picsum.photos/seed/beach/500/300",
        likes: 6,
        comments: 4,
        shares: 2
      },
      {
        id: 2,
        username: "Bob Smith",
        profilePic: "https://picsum.photos/seed/bob/50",
        time: "3 hours ago",
        caption: "My new kitten is adorable 🐱",
        image: "https://picsum.photos/seed/kitten/500/300",
        likes: 15,
        comments: 10,
        shares: 5
      }
    ];

    return (
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img
                src={post.profilePic}
                alt={post.username}
                className="post-profile-pic"
              />
              <div>
                <span className="post-username">{post.username}</span>
                <span className="post-time">{post.time}</span>
              </div>
            </div>

            <div className="post-caption">{post.caption}</div>

            <img src={post.image} alt="Post" className="post-image" />

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
