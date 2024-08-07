import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { GoEye, GoEyeClosed } from "react-icons/go";

import "./index.scss";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsgUsername, setErrMsgUsername] = useState(false);
  const [errMsgPassword, setErrMsgPassword] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showErrorUsername = () => {
    if (username === "") {
      setErrMsgUsername(true);
    } else {
      setErrMsgUsername(false);
    }
  };

  const showErrorPassword = () => {
    if (password === "") {
      setErrMsgPassword(true);
    } else {
      setErrMsgPassword(false);
    }
  };

  const onSubmit = (token) => {
    setLoginErrorMsg("");
    const { history } = props;
    Cookies.set("jwt_token", token, { expires: 30 });
    history.replace("/");
  };

  const loginUser = async (event) => {
    event.preventDefault();
    if (username !== "" && password !== "") {
      const userDetails = {
        username,
        password,
      };

      const url = "https://spicy-carvings-backend.onrender.com/login";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(url, options);

      if (response.ok) {
        const responseData = await response.json();
        onSubmit(responseData.jwtToken);
      } else {
        const responseData = await response.text();
        setLoginErrorMsg(responseData);
      }
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  const passwordInputIcon = showPassword ? (
    <GoEye size={25} />
  ) : (
    <GoEyeClosed size={25} />
  );

  return (
    <section className="login-main-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722442571/restaurant_logo_spicy_craving_fsxrpn.jpg"
          alt="restaurant_logo"
          className="website-logo"
        />
        <h1 className="website-name">Spicy Cravings</h1>
      </div>
      <div className="form-main-container">
        <h1 className="welcome-back">Welcome Back...</h1>
        <form onSubmit={loginUser} className="form-container">
          <div className="input-container">
            <label className="input-label">username</label>
            <input
              className="user-input"
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              onBlur={showErrorUsername}
            />
            {errMsgUsername && (
              <p className="error-msg">*Enter your username</p>
            )}
          </div>
          <div className="input-container">
            <label className="input-label">password</label>
            <div className="password-container">
              <input
                className="user-input"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={showErrorPassword}
                value={password}
              />
              <button
                type="button"
                className="show-password-icon-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {passwordInputIcon}
              </button>
            </div>

            {errMsgPassword && (
              <p className="error-msg">*Enter your password</p>
            )}
          </div>
          {loginErrorMsg !== "" ? (
            <p className="login-error-msg">*{loginErrorMsg}</p>
          ) : (
            ""
          )}
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="register-link">
            Don't have an account?
            <Link className="register-link-button" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
