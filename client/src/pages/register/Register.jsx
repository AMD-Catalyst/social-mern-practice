import "./register.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const logHandler = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match.");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      };

      try {
        await axios.post("auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social</h3>
          <span className="registerDesc">Connect with friends on Social</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              ref={username}
              type="text"
              placeholder="Username"
              className="registerInput"
              required
            />
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="registerInput"
              required
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="registerInput"
              minLength={6}
              required
            />
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="registerInput"
              required
            />
            <button type="submit" className="registerButton">
              Sign-Up
            </button>
            <button onClick={logHandler} className="registerRegisterButton">
              Login your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
