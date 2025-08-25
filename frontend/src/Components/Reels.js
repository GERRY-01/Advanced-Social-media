import React, { useState, useEffect } from "react";
import "./Reels.css";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Reels = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const [posts, setPosts] = useState([]);
  const [opencomments, setOpencomments] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    axios
      .get("http://127.0.0.1:8000/getposts?user_id=" + user_id)
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

const handletime =(timestamp)=> {
  const now= new Date();
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

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

const submitcomment = (postid, comment) => {
  const user_id = localStorage.getItem("user_id");
  axios
    .post(`http://127.0.0.1:8000/addcomment/${postid}`,  {comment, user_id}
    )
    .then((response) => {
      console.log("Comment submitted successfully:", response.data);
      setComment("");
      setComments([...comments, response.data.comment]);
    })
    .catch((error) => {
      console.error("Error submitting comment:", error);
    });
};

//fetching all comments per post
useEffect(() => {
  if(!opencomments) return
  axios
    .get(`http://127.0.0.1:8000/getcomments/${opencomments}`)
    .then((response) => {
      setComments(response.data.comments);
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
},[opencomments]);

//dealing with likes
const toggleLikes = (postid) => {
  const user_id = localStorage.getItem("user_id");
  axios
    .post(`http://127.0.0.1:8000/likepost/${postid}`, { user_id })
    .then((response) => {
      console.log("Like submitted successfully:", response.data);
      setPosts(
        posts.map((post) =>
          post.id === postid ? { ...post, likes: response.data.likes,  liked: response.data.liked } : post
        )
      );
    })
    .catch((error) => {
      console.error("Error submitting like:", error);
    });
}

  return (
    <div className="reels-page">
      <Navbar />
      <Sidebar />

      <div className="reels-container">
        {posts.filter((post) => post.video).map((post) => (
          <div className="reel" key={post.id}>
            {/* Top section */}
            <div className="reel-header">
              <img src={post.user.profile_pic} alt="profile" className="profile-pic" />
              <div className="reel-info">
                <span className="username">{post.user.username}</span>
                <span className="time">{handletime(post.time)}</span>
              </div>
              <div className="reel-menu">
                <BsThreeDotsVertical
                  className="menu-icon"
                  onClick={() => toggleMenu(post.id)}
                />
                {menuOpen === post.id && (
                  <div className="menu-options">
                    <p>Edit</p>
                    <p>Delete</p>
                  </div>
                )}
              </div>
            </div>

            {/* Video */}
               <div className="post-caption">{post.caption}</div>
                <video className="reel-video" controls>
                  <source src={post.video} type="video/mp4" />
                </video>
            
            
            {/* Actions */}
              <div className="reel-actions">
                <span>
                  <FaHeart size={18} className="action-icon" 
                  style={{ color: post.liked ? "red" : "grey" }}
                  onClick={() => toggleLikes(post.id)}/> {post.likes} Likes
                </span>
                <span>
                  <FaComment size={18} className="action-icon" onClick={() => setOpencomments(opencomments === post.id ? null : post.id)}/> {post.comments} Comments
                </span>
                <span>
                  <FaShare size={18} className="action-icon" /> {post.shares} Shares
                </span>
              </div>


          {/* Reels Comment section */}
          {opencomments === post.id && (
            <div className="reels-comment-section">
              <div className="reels-comments-header">
                <span className="reels-comments-title">Comments</span>
                <button
                  className="reels-close-btn"
                  onClick={() => setOpencomments(null)}
                >
                  ✖
                </button>
              </div>

                  {/* Scrollable comments list */}
                <div className="reels-comments-list">
                  {comments.length > 0 ? (
                    comments.map((c) => (
                      <div className="comment" key={c.id}>
                        <img
                          src={c.user.profile_pic || "https://i.pravatar.cc/40"}
                          alt={c.user.username}
                          className="comment-pic"
                        />
                        <div className="comment-body">
                          <span className="comment-username">{c.user.username}</span>
                          <p className="comment-text">{c.comment}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet</p>
                  )}
                </div>


                  {/* Fixed input */}
                  <div className="reels-comment-input">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="reels-comment-textbox"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="reels-send-btn" onClick={() => submitcomment(post.id,comment)}>➤</button>
                  </div>
                </div>
              )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
