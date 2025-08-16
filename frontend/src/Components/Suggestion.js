import React from "react";
import "./Suggestion.css";

const Suggestions = () => {
  const suggestedUsers = [
    {
      id: 1,
      name: "Jane Doe",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      followsBack: false,
    },
    {
      id: 2,
      name: "John Smith",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      followsBack: true,
    },
    {
      id: 3,
      name: "Emily Carter",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
      followsBack: false,
    },
    {
      id: 4,
      name: "Michael Johnson",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
      followsBack: true,
    },
    {
      id: 5,
      name: "Sophia Lee",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
      followsBack: false,
    },
    {
      id: 6,
      name: "Daniel Kim",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
      followsBack: true,
    },
  ];

  return (
    <div className="suggestions-container">
      <h3 className="suggestions-title">Suggested for you</h3>
      <ul className="suggestions-list">
        {suggestedUsers.map((user) => (
          <li className="suggestion-item" key={user.id}>
            <img
              src={user.profilePic}
              alt={user.name}
              className="suggestion-pic"
            />
            <span className="suggestion-name">{user.name}</span>
            <button
              className={`follow-btn ${
                user.followsBack ? "follow-back" : "follow"
              }`}
            >
              {user.followsBack ? "Follow back" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
