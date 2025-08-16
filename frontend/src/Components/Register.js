import React, { Component } from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import "./Register.css";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            dob: "",
            gender: "",
            password: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            error: "",
            success: "",
            redirect: false
        };
    }

    togglePassword = () => {
        this.setState(prev => ({ showPassword: !prev.showPassword }));
    };

    toggleConfirmPassword = () => {
        this.setState(prev => ({ showConfirmPassword: !prev.showConfirmPassword }));
    };

    submitted = (e) => {
        e.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: "Passwords do not match", success: "" });
            return;
        }

        axios.post("http://127.0.0.1:8000/register", {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            dob: this.state.dob,
            gender: this.state.gender,
            password: this.state.password
        })
        .then(res => {
            this.setState({ success: "Account created successfully!", error: "" });
            this.setState({ redirect: true });
        })
        .catch(err => {
            console.error(err);
            this.setState({ error: "Registration failed. Please try again.", success: "" });
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/completeregistration" />;
        }
        return (
            <div className="register-container">
                <div className="register-card">
                    <h2>Create an Account</h2>
                    <p className="subtitle">Join our social media community</p>

                    <form onSubmit={this.submitted} className="register-form">
                        <div className="form-row">
                            <div className="input-group">
                                <FaUser className="input-icon" />
                                <input 
                                    type="text" 
                                    placeholder="First Name" 
                                    onChange={e => this.setState({ firstName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <FaUser className="input-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    onChange={e => this.setState({ lastName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <FaUser className="input-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    onChange={e => this.setState({ username: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <FaEnvelope className="input-icon" />
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    onChange={e => this.setState({ email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Date of Birth"
                                    onFocus={(e)=> e.target.type="date"}
                                    onBlur={(e)=> e.target.type = "text"}
                                    onChange={e => this.setState({ dob: e.target.value })}
                                    required
                                    className="dob-field"
                                />
                            </div>

                            <div className="input-group">
                                <select 
                                    onChange={e => this.setState({ gender: e.target.value })}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input 
                                    type={this.state.showPassword ? "text" : "password"} 
                                    placeholder="Password" 
                                    onChange={e => this.setState({ password: e.target.value })}
                                    required
                                />
                                <span className="toggle-password" onClick={this.togglePassword}>
                                    {this.state.showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input 
                                    type={this.state.showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm Password" 
                                    onChange={e => this.setState({ confirmPassword: e.target.value })}
                                    required
                                />
                                <span className="toggle-password" onClick={this.toggleConfirmPassword}>
                                    {this.state.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <button className="register-btn" type="submit">Register</button>
                    </form>

                    <div className="divider">or sign up with</div>
                    <div className="social-login">
                        <button className="social-btn google">
                            <FcGoogle size={20} />
                        </button>
                        <button className="social-btn facebook">
                            <FaFacebook size={20} />
                        </button>
                    </div>

                    {this.state.error && <p className="error-text">{this.state.error}</p>}
                    {this.state.success && <p className="success-text">{this.state.success}</p>}

                    <p className="login-text">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Register;
