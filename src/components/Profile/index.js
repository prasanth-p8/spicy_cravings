import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import Header from "../Header";
import Footer from "../Footer";
import "reactjs-popup/dist/index.css";
import "./index.scss";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

function Profile(props) {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    data: null,
  });

  const displayProfileContent = async () => {
    setApiStatus({
      status: apiConstants.inProgress,
      data: null,
    });

    const jwtToken = Cookies.get("jwt_token");
    const url = "https://spicy-carvings-backend.onrender.com/profile";

    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const responseData = await response.json();

      setApiStatus({
        status: apiConstants.success,
        data: responseData,
      });
    } else {
      const responseData = await response.text();
      setApiStatus({
        status: apiConstants.failure,
        data: responseData,
      });
    }
  };

  useEffect(() => {
    displayProfileContent();
  }, []);

  const renderSuccessView = () => {
    const { data } = apiStatus;
    const { username, firstname, lastname, email, gender } = data;
    const profileAvatar =
      gender === "male"
        ? "https://res.cloudinary.com/dlefoxknm/image/upload/v1722360484/woman_1_nwpblz.png"
        : "https://res.cloudinary.com/dlefoxknm/image/upload/v1722360484/boy_1_oxbcrg.png";

    const logoutUser = () => {
      const { history } = props;
      Cookies.remove("jwt_token");
      localStorage.removeItem("user_details");
      history.replace("/login");
    };

    return (
      <>
        <Header />
        <div className="profile-main-contaier">
          <div className="profile-user-container">
            <img
              src={profileAvatar}
              alt="avatar-icon"
              className="profile-avatar-icon"
            />
            <div className="profile-user-details">
              <p>
                {firstname[0].toUpperCase() + firstname.slice(1)}{" "}
                {lastname[0].toUpperCase() + lastname.slice(1)}
              </p>
              <p>{email}</p>
            </div>
          </div>
          <div>
            <h1>Account</h1>
            <hr />
            <p>Username: {username[0].toUpperCase() + username.slice(1)}</p>
            <hr />
            <p>Password: {"*".repeat(10)}</p>
            <hr />
          </div>
          <div className="logout-button-container">
            <Popup
              modal
              trigger={
                <button className="button logout-button" on>
                  Logout
                </button>
              }
            >
              {(close) => (
                <>
                  <div className="logout-popup-container">
                    <h3>Are you sure you want to logout?</h3>
                    <div className="logout-popup-button">
                      <button
                        type="button"
                        className="button confirm-button"
                        onClick={logoutUser}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="button cancel-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  const renderLoadingView = () => {};

  const renderFailureView = () => {};

  const renderProfilePage = () => {
    const { status } = apiStatus;
    switch (status) {
      case apiConstants.inProgress:
        return renderLoadingView();
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return renderProfilePage();
}

export default Profile;
