import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from '../../styles/Register.module.css'; // Import your CSS module here
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      baseURL: process.env.REACT_APP_URL, // Set a base URL for all requests from this instance
    });
    try {
      const res = await instance.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
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
    <div className={`${styles.box} ${styles['login-body']}`}>
      <div className={styles.container}>
        <div className={styles['top-header']}>
          <span className={styles.spanid}>Create an Account</span>
          <header>Register</header>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-body']}>
            <div className={styles['input-field']}>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
                autoCompleteHint="off"
              />
              <i className="bx bx-user"></i>
            </div>
            <div className={styles['input-field']}>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                autoCompleteHint="off"
              />
              <i className="bx bx-envelope"></i>
            </div>
            <div className={styles['input-field']}>
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                autoCompleteHint="off"
              />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className={styles['input-field']}>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="off"
                autoCompleteHint="off"
              />
              <i className="bx bx-phone"></i>
            </div>
            <div className={styles['input-field']}>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                autoComplete="off"
                autoCompleteHint="off"
              />
              <i className="bx bx-map"></i>
            </div>
            <div className={styles['input-field']}>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your secret key"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                autoComplete="off"
                autoCompleteHint="off"
              />
              <i className="bx bx-key"></i>
            </div>
          </div>
          <div className={`${styles['submit-btn']} mx-lg-auto`}>
            <input type="submit" className={styles.submit} value="Register" />
          </div>
        </form>
        <div className={styles.bottom}>
          <div className={styles.right}>
            <label>
              Already have an account? <Link to="/login">Login here</Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
