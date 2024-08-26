import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { MdOutlineDining, MdOutlineDeliveryDining } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { TfiGift } from "react-icons/tfi";
import { FaStar } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";
import "./index.scss";
import FailureView from "../FailureView";
import LoadingView from "../LoadingView";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

function Home() {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    data: null,
  });

  //function to get data from backend using fetch method
  const displayHomeContent = async () => {
    setApiStatus({
      status: apiConstants.inProgress,
      data: null,
    });

    const jwtToken = Cookies.get("jwt_token");
    const url = "https://spicy-carvings-backend.onrender.com";

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
    displayHomeContent();
  }, []);

  //function to render the success view of home page
  const renderSuccessView = () => {
    const { data } = apiStatus;

    localStorage.setItem("user_details", JSON.stringify(data));
    return (
      <div className="home-main-container">
        <section className="home-banner-section">
          <div className="banner-section-content">
            <h1>
              Dive into Delights Of Delectable
              <span className="text-highlight">Food</span>
            </h1>
            <p className="banner-section-description">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <Link to="/menu" className="home-navgivate-button">
              Order Now
            </Link>
          </div>
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722361938/Banner_Image_rsu5sh.png"
            alt="banner"
            className="banner-image"
          />
        </section>
        <section className="customer-favorites-section">
          <p className="section-heading">CUSTOMERS FAVORITES</p>
          <h1 className="section-sub-heading">Popular Catagories</h1>
          <ul className="fav-item-list">
            <Link to="/menu" className="fav-item">
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722365670/burger_j57cys.png"
                alt="burger"
                className="item-img-bg"
              />
              <p className="fav-item-names">Burger</p>
            </Link>
            <Link to="/menu" className="fav-item">
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722365671/sandwitch_ixudnv.png"
                alt="sandwich"
                className="item-img-bg"
              />
              <p className="fav-item-names">Sandwich</p>
            </Link>
            <Link to="/menu" className="fav-item">
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722365671/dessert_py8wvz.png"
                alt="dessert"
                className="item-img-bg"
              />
              <p className="fav-item-names">Dessert</p>
            </Link>
            <Link to="/menu" className="fav-item">
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722365670/juice_nljk8m.png"
                alt="juice"
                className="item-img-bg"
              />
              <p className="fav-item-names">Juice</p>
            </Link>
          </ul>
        </section>
        <section className="testimonials-section">
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722415478/Testimonials_Image_u2q72g.png"
            alt="our best cheif"
            className="our-best-cheif"
          />
          <div className="customer-feedback-content-container">
            <p className="section-heading">TESTIMONIALS</p>
            <h1 className="section-sub-heading">
              What Our Customers Say About Us
            </h1>
            <p className="customer-feedback">
              “I had the pleasure of dining at Spicy Cravings last night, and
              I'm still raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </p>
            <div className="customer-feedback-container">
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722415502/Mask_group_flfvrm.png"
                alt="customer"
              />
              <div>
                <h1 className="customer-feedback-heading">Customer Feedback</h1>
                <div className="feedback-detail-container">
                  <FaStar fill="#FFE605" size={24} />
                  <p className="customer-rating">4.9</p>
                  <p className="rating-count">(1.6k Reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="service-section">
          <div className="service-section-main-content">
            <p className="section-heading">OUR STORY & SERVICES</p>
            <h1 className="section-sub-heading">
              Our Culinary Journey & Services
            </h1>
            <p className="service-content-description">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <Link to="/about" className="home-navgivate-button">
              Explore Now
            </Link>
          </div>
          <ul className="serivce-list">
            <li className="service-items">
              <MdOutlineDining size={45} />
              <h1 className="service-heading">DINING</h1>
              <p className="service-description">
                Delight your dining with our flavors and presentation
              </p>
            </li>
            <li className="service-items">
              <MdOutlineDeliveryDining size={45} />
              <h1 className="service-heading">FAST DELIVERY</h1>
              <p className="service-description">
                We deliver your order promptly to your door
              </p>
            </li>
            <li className="service-items">
              <IoFastFoodOutline size={45} />
              <h1 className="service-heading">ONLINE ORDERING</h1>
              <p className="service-description">
                Explore menu & order with ease using our Online Ordering
              </p>
            </li>
            <li className="service-items">
              <TfiGift size={45} />
              <h1 className="service-heading">GIFT CARDS</h1>
              <p className="service-description">
                Giving the gift of exceptional dining with Carving Gift Cards
              </p>
            </li>
          </ul>
        </section>
      </div>
    );
  };

  //function to render the loading view of home page
  const renderLoadingView = () => <LoadingView />;

  //function to render the failure view of home page
  const renderFailureView = () => <FailureView reload={displayHomeContent} />;

  //function having switch statement to render the different view based on the api status
  const renderHomePage = () => {
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

  return (
    <>
      <Header />
      {renderHomePage()}
      <Footer />
    </>
  );
}

export default Home;
