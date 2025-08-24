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

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/getposts")
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
              
                <video className="reel-video" controls>
                  <source src={post.video} type="video/mp4" />
                </video>
            
            
            {/* Actions */}
              <div className="reel-actions">
                <span>
                  <FaHeart size={18} className="action-icon" /> {post.likes} Likes
                </span>
                <span>
                  <FaComment size={18} className="action-icon" /> {post.comments} Comments
                </span>
                <span>
                  <FaShare size={18} className="action-icon" /> {post.shares} Shares
                </span>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
