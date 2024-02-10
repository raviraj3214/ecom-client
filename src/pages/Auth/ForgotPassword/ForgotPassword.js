import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Index.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const instance = axios.create({
    baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
  });
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className={`${styles.box} ${styles["login-body"]}`}>
      <div className={styles.container}>
        <div className={styles["top-header"]}>
          <span className={styles.spanid}>Forgot Your Password?</span>
          <header>Reset Password</header>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles["input-field"]}>
            <input
              type="text"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
          <div className={styles["input-field"]}>
            <input
              type="password"
              className={styles.input}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
          <div className={styles["input-field"]}>
            <input
              type="text"
              className={styles.input}
              placeholder="Your secret key"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
          <div className={styles["input-field"]}>
            <input type="submit" className={styles.submit} value="Reset Password" />
          </div>
        </form>
        <div className={styles.bottom}>
          <div className={styles.right}>
            <label>
              <Link to="/login">Back to Login</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
};
export default ForgotPassword;