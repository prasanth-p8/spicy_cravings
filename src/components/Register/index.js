import { useState } from "react";
import { Link } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import "./index.scss";

function Register(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState("male");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [allFieldsNeeded, setAllFieldsNeeded] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log(wrongPassword);
  console.log(allFieldsNeeded);

  const registerUser = async (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      setWrongPassword(true);
    } else {
      setWrongPassword(false);
      if (
        firstname !== "" &&
        lastname !== "" &&
        username !== "" &&
        email !== "" &&
        password !== "" &&
        password.length >= 8 &&
        rePassword !== ""
      ) {
        setAllFieldsNeeded(false);
        const userDetails = {
          firstname,
          lastname,
          username,
          email,
          password,
          gender,
        };
        const url = "https://spicy-carvings-backend.onrender.com/register";

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        };

        const response = await fetch(url, options);
        if (response.ok) {
          setErrMsg("");
          const { history } = props;
          history.replace("/login");
        } else {
          const responseData = await response.text();
          setErrMsg(responseData);
        }
      } else {
        setAllFieldsNeeded(true);
      }
    }
  };

  const checkPasswordStrength = () => {
    if (password.length >= 8) {
      setWeakPassword(false);
    } else {
      setWeakPassword(true);
    }
  };

  const passwordInputIcon = showPassword ? (
    <GoEye size={25} />
  ) : (
    <GoEyeClosed size={25} />
  );

  return (
    <section className="register-main-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722442571/restaurant_logo_spicy_craving_fsxrpn.jpg"
          alt="restaurant_logo"
          className="website-logo"
        />
        <h1 className="website-name">Spicy Carvings</h1>
      </div>
      <div>
        <h1 className="register-heading">
          Register with Spicy Carvings to get presonalized offers
        </h1>
        <form className="register-form-container" onSubmit={registerUser}>
          <div className="first-lastname-container">
            <input
              type="text"
              className="user-input"
              placeholder="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              className="user-input"
              placeholder="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              className="user-input"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errMsg === "" ? (
              ""
            ) : (
              <p className="display-errorMsg errMsg-bg">*{errMsg}</p>
            )}
            <input
              type="email"
              className="user-input"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="user-input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={checkPasswordStrength}
              />
              <button
                className="show-password-icon-button"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {passwordInputIcon}
              </button>
            </div>
            {weakPassword && (
              <p className="display-errorMsg errMsg-bg">
                *minimum 8 characters needed!
              </p>
            )}
            <input
              type="password"
              className="user-input"
              placeholder="re-enter password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />

            {wrongPassword && (
              <p className="display-errorMsg">
                *Password Entered is Mismatched
              </p>
            )}
            {allFieldsNeeded && (
              <p className="display-errorMsg">
                *All fields are mandatory to register
              </p>
            )}
          </div>
          <div className="gender-input-container">
            <div className="gender-label-container">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male" className="gender-label">
                Male
              </label>
            </div>
            <div className="gender-label-container">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female" className="gender-label">
                Female
              </label>
            </div>
          </div>
          <button className="register-button" type="submit">
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account?
          <Link to="/login" className="login-link-button">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
