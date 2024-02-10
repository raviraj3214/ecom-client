import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation,Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from '../../styles/Login.module.css'; // Import your CSS module here
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
    });
    try {
      const res = await instance.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className={`${styles.box} ${styles['login-body']}`}>
    <div className={styles.container}>
      <div className={styles['top-header']}>
        <span className={styles.spanid} style={{ marginRight: '5px' }}>Not have an account?   <Link to="/register">Sign up </Link>  here</span>
        <header>Login</header>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles['input-field']}>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bx-user"></i>
        </div>
        <div className={styles['input-field']}>
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bx-lock-alt"></i>
        </div>
        <div className={styles['input-field']}>
          <input type="submit" className={styles.submit} value="Login" />
        </div>
      </form>
      <div className={styles.bottom}>
        <div className={styles.right}>
          <label>
            <Link to="/forgot-password">Forgot password?</Link>
          </label>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
