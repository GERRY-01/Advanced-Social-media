import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Stories from "./Components/Stories";
import Posts from "./Components/Posts";
import MobileMenu from "./Components/MobileMenu";
import Greeting from "./Components/Greeting";
import './App.css';
import Suggestions from "./Components/Suggestion";
import CompleteRegistration from "./Components/CompleteRegistration";
import Reels from "./Components/Reels";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={
          <div>
          <Navbar/> <Sidebar/> <MobileMenu/> <Greeting/> <Stories/> 
          <Posts/> <Suggestions/>
          </div>} />
        <Route path="/completeregistration" element={<CompleteRegistration />} />
        <Route path="/reels" element={<Reels/>}/>
      </Routes>
    </Router>
     
    
  )
}

export default App;