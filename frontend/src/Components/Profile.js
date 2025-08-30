import React, { Component } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import "./Profile.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import  axios  from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user_info: {},
          user_posts: [],
        };
    }
    componentDidMount() {
        this.fetchUserData();
        this.fetchUserPosts();
    }
    fetchUserData  () {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            axios
                .get(`http://127.0.0.1:8000/userdata?user_id=${user_id}`)
                .then((response) => {
                    this.setState({ user_info: response.data });
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }
    fetchUserPosts  () {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            axios
                .get(`http://127.0.0.1:8000/getposts?user_id=${user_id}`)
                .then((response) => {
                    this.setState({ user_posts: response.data.user_posts });
                })
                .catch((error) => {
                    console.error("Error fetching user posts:", error);
                });
        }
    }
  render() {
    // const posts = [
    //   { id: 1, image: "https://picsum.photos/seed/post1/800/600", caption: "Beautiful sunset at the beach", likes: 120, comments: 18, shares: 7 },
    //   { id: 2, image: "https://picsum.photos/seed/post2/800/600", caption: "Coffee and code session", likes: 95, comments: 10, shares: 3 },
    //   { id: 3, image: "https://picsum.photos/seed/post3/800/600", caption: "Weekend hiking adventure", likes: 210, comments: 34, shares: 12 },
    //   { id: 4, image: "https://picsum.photos/seed/post4/800/600", caption: "New project launch day", likes: 60, comments: 6, shares: 1 },
    //   { id: 5, image: "https://picsum.photos/seed/post5/800/600", caption: "Team building event", likes: 150, comments: 22, shares: 5 },
    //   { id: 6, image: "https://picsum.photos/seed/post6/800/600", caption: "Late night coding", likes: 33, comments: 4, shares: 0 },
    // ];


    const { username, email, first_name, last_name, profile_pic, bio, dob, gender, phone_num, location } = this.state.user_info;


    return (
      <div>
        <Navbar />
        <div className="profile-main-container">
          <Link to="/" className="back-to-home-btn">
            <span>Back to Home</span>
            <span className="arrow">→</span>
          </Link>
          <h1 className="profile-page-title">My Profile</h1>
          
          {/* Profile Header - Centered */}
          <div className="profile-top-section">
            <div className="profile-image-wrapper">
              <img
                src={profile_pic}
                alt={username}
                onError={(e) => { e.currentTarget.src = "https://i.pravatar.cc/200?img=1"; }}
              />
            </div>
            
            <h2 className="profile-username">@{username}</h2>
            
            <div className="profile-stats">
              <div>
                <span>45</span>
                <p>Posts</p>
              </div>
              <div>
                <span>120</span>
                <p>Followers</p>
              </div>
              <div>
                <span>180</span>
                <p>Following</p>
              </div>
            </div>
          </div>

          {/* User Details - Two Column Layout */}
          <div className="profile-details-wrapper">
            <div className="profile-details-left">
              <div className="profile-name-section">
                <p><span className="profile-label">First Name: </span> {first_name}</p>
                <p><span className="profile-label">Last Name: </span> {last_name}</p>
              </div>
              <div className="profile-bio-section">
                <h3 className="profile-section-title">Bio</h3>
                <p className="profile-bio-text">{bio}</p>
              </div>
              <div className="profile-info-grid">
                <p><span className="profile-label">Email: </span>{email}</p>
                <p><span className="profile-label">Date of Birth: </span>{dob}</p>
                <p><span className="profile-label">Gender: </span>{gender}</p>
                <p><span className="profile-label">Phone: </span>{phone_num}</p>
                <p><span className="profile-label">Location: </span>{location}</p>
              </div>
            </div>
            
            <div className="profile-details-right">
              <div className="profile-activity-card">
                <h3 className="profile-section-title">Recent Activity</h3>
                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <p>Posted "Beautiful sunset at the beach"</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <p>Liked 5 posts</p>
                  <span className="activity-time">4 hours ago</span>
                </div>
                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <p>Followed 2 new users</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
              
              <div className="profile-stats-card">
                <h3 className="profile-section-title">Quick Stats</h3>
                <div className="stats-item">
                  <span className="stats-number">156</span>
                  <span className="stats-label">Total Likes</span>
                </div>
                <div className="stats-item">
                  <span className="stats-number">89</span>
                  <span className="stats-label">Comments Made</span>
                </div>
                <div className="stats-item">
                  <span className="stats-number">23</span>
                  <span className="stats-label">Posts This Month</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Posts */}
          <div className="profile-posts-section">
            <h2 className="profile-section-title">User Posts</h2>
            <div className="profile-posts-grid">
              {this.state.user_posts && this.state.user_posts.map((post) => (
                <div key={post.id} className="profile-post-card">
                  <div className="profile-post-header">
                    <p className="profile-post-caption">{post.caption}</p>
                  </div>
                  {post.video && <video src={post.video} controls />}
                  {post.image && <img src={post.image} alt={`Post ${post.id}`} />}
                  <div className="profile-post-actions">
                    <button type="button" className="profile-action-btn">
                      <FaHeart className="profile-icon" /> <span>{post.likes}</span>
                    </button>
                    <button type="button" className="profile-action-btn">
                      <FaComment className="profile-icon" /> <span>{post.comments}</span>
                    </button>
                    <button type="button" className="profile-action-btn">
                      <FaShare className="profile-icon" /> <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;


