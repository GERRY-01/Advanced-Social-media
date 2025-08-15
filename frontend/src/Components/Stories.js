// src/Components/Stories.js
import React, { Component } from "react";
import "./Stories.css";

class Stories extends Component {
  render() {
    const stories = [
      { id: 1, name: "Your Story", img: "https://picsum.photos/seed/you/80" },
      { id: 2, name: "Alice", img: "https://picsum.photos/seed/alice/80" },
      { id: 3, name: "Bob", img: "https://picsum.photos/seed/bob/80" },
      { id: 4, name: "Charlie", img: "https://picsum.photos/seed/charlie/80" },
      { id: 5, name: "Diana", img: "https://picsum.photos/seed/diana/80" },
      { id: 6, name: "Eve", img: "https://picsum.photos/seed/eve/80" },
      { id: 7, name: "Frank", img: "https://picsum.photos/seed/frank/80" },
      { id: 8, name: "Grace", img: "https://picsum.photos/seed/grace/80" },
    ];

    return (
      <div className="stories-container">
        <div className="stories-scroll">
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              <img
                src={story.img}
                alt={story.name}
                className="story-img"
              />
              <span className="story-name">{story.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Stories;
