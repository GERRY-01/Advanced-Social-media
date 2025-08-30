import React, { Component } from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { Navigate } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
            success: "",
            showPassword: false,
            redirect: false
        };
    }

    submitted = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/login", {
            username: this.state.username,
            password: this.state.password
        }, 
            {withCredentials: true}
        
        ).then(res => {
            console.log(res.data);
            localStorage.setItem("user_id", res.data.user_id);
            this.setState({ success: "Login successful" });
            this.setState({ redirect: true });
        }).catch(err => {
            console.error(err);
            this.setState({ error: "Invalid credentials" });
        });
    }

    togglePasswordVisibility = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/"/>
        }
        return (
            <div className="login-container">
                <div className="login-card">
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Login to your account</p>
                    <form onSubmit={this.submitted}>
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={e => this.setState({ username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type={this.state.showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={e => this.setState({ password: e.target.value })}
                                required
                            />
                            <span
                                className="toggle-password"
                                onClick={this.togglePasswordVisibility}
                            >
                                {this.state.showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>

                    {this.state.error && <p className="error-message">{this.state.error}</p>}
                    {this.state.success && <p className="success-message">{this.state.success}</p>}

                    <div className="divider">or login with</div>

                    <div className="social-login">
                        <button className="social-btn facebook"><FaFacebookF /></button>
                        <button className="social-btn google"><FcGoogle /></button>
                    </div>

                    <p className="signup-text">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;

