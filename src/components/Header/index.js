import { useState, useContext } from "react";
import { BsFillMenuButtonWideFill, BsCartCheck } from "react-icons/bs";
import { FaHamburger, FaHome, FaHistory } from "react-icons/fa";
import { FaPeopleGroup, FaRegCircleUser } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

import "./index.scss";
import CartContext from "../CartContext";

const locationList = [
  { id: 0, name: "Ariyalur" },
  { id: 1, name: "Chengalpattu" },
  { id: 2, name: "Chennai" },
  { id: 3, name: "Coimbatore" },
  { id: 4, name: "Cuddalore" },
  { id: 5, name: "Dharmapuri" },
  { id: 6, name: "Dindigul" },
  { id: 7, name: "Erode" },
  { id: 8, name: "Kallakurichi" },
  { id: 9, name: "Kancheepuram" },
  { id: 10, name: "Karur" },
  { id: 11, name: "Krishnagiri" },
  { id: 12, name: "Madurai" },
  { id: 13, name: "Mayiladuthurai" },
  { id: 14, name: "Nagapattinam" },
  { id: 15, name: "Nagercoil" },
  { id: 16, name: "Namakkal" },
  { id: 17, name: "Perambalur" },
  { id: 18, name: "Puducherry" },
  { id: 19, name: "Pudukkottai" },
  { id: 20, name: "Ramanathapuram" },
  { id: 21, name: "Ranipet" },
  { id: 22, name: "Salem" },
  { id: 23, name: "Sivagangai" },
  { id: 24, name: "Tenkasi" },
  { id: 25, name: "Thanjavur" },
  { id: 26, name: "Theni" },
  { id: 27, name: "Thiruvallur" },
  { id: 28, name: "Thiruvarur" },
  { id: 29, name: "Thoothukudi" },
  { id: 30, name: "Tiruchirappalli" },
  { id: 31, name: "Tirunelveli" },
  { id: 32, name: "Tirupathur" },
  { id: 33, name: "Tiruppur" },
  { id: 34, name: "Tiruvannamalai" },
  { id: 35, name: "Udagamandalam" },
  { id: 36, name: "Vellore" },
  { id: 37, name: "Viluppuram" },
  { id: 38, name: "Virudhunagar" },
];

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const { cart, headerLocation, setHeaderLocation } = useContext(CartContext);

  //opening and closing sidebar in medium device toggle funciton
  const openSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //getting user details from localStorage
  const userDetails = JSON.parse(localStorage.getItem("user_details"));
  const { gender, username } = userDetails;

  //choosing profile avatar pic with the response data from the backend
  const profileAvatar =
    gender === "female"
      ? "https://res.cloudinary.com/dlefoxknm/image/upload/v1722360484/woman_1_nwpblz.png"
      : "https://res.cloudinary.com/dlefoxknm/image/upload/v1722360484/boy_1_oxbcrg.png";

  return (
    <header>
      <div className="header-main-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722442571/restaurant_logo_spicy_craving_fsxrpn.jpg"
            alt="restaurant_logo"
            className="website-logo"
          />
        </Link>
        <nav className="nav-bar">
          <div className="location-select-container">
            <ImLocation2 size={20} fill="#fff" />
            <select
              className="location-drop-down-list"
              onChange={(e) => setHeaderLocation(e.target.value)}
              value={headerLocation}
            >
              {locationList.map((location) => (
                <option
                  className="options-list"
                  key={location.id}
                  value={location.name}
                >
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <FaHamburger
            size={30}
            fill="#fff"
            onClick={openSidebar}
            className="show-hamburger"
          />
          <ul className="nav-bar-desktop">
            <Link className="desktop-nav-items" to="/">
              Home
            </Link>
            <Link className="desktop-nav-items" to="/menu">
              Menu
            </Link>
            <Link className="desktop-nav-items" to="/cart">
              Cart
              {cart.length > 0 && (
                <span className="cart-item-count">{cart.length}</span>
              )}
            </Link>
            <Link to="/order-history">
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722360484/history_n5p4fo.png"
                alt="order-history-icon"
              />
            </Link>
            <Link to="/profile">
              <img
                src={profileAvatar}
                alt="avatar-icon"
                className="avatar-navbar-icon"
              />
            </Link>
          </ul>
        </nav>
      </div>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <IoMdClose className="close-button" onClick={openSidebar} />
        <div className="sidebar-user-container">
          <img
            src={profileAvatar}
            alt="avatar-icon"
            className="sidebar-avatar"
          />
          <p>{username[0].toUpperCase() + username.slice(1)}</p>
        </div>
        <ul className="sidebar-menu-items">
          <Link to="/" className="sidebar-item">
            <FaHome size={25} />
            <p className="sidebar-menu-content">Home</p>
          </Link>
          <Link to="/menu" className="sidebar-item">
            <BsFillMenuButtonWideFill size={25} />
            <p className="sidebar-menu-content">Menu</p>
          </Link>

          <Link to="/cart" className="sidebar-item">
            <BsCartCheck size={25} />
            <p className="sidebar-menu-content">Cart</p>
            {cart.length > 0 && (
              <span className="cart-item-count">{cart.length}</span>
            )}
          </Link>
          <Link to="/order-history" className="sidebar-item">
            <FaHistory size={25} />
            <p className="sidebar-menu-content">Order History</p>
          </Link>
          <Link to="/about" className="sidebar-item">
            <FaPeopleGroup size={25} />
            <p className="sidebar-menu-content">About us</p>
          </Link>
          <Link to="/profile" className="sidebar-item">
            <FaRegCircleUser size={25} />
            <p className="sidebar-menu-content">Profile</p>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
