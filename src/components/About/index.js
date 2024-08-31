import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ReactPlayer from "react-player/youtube";

import "./index.scss";

function About() {
  const ckLiveYoutubeLink = "https://youtu.be/rlD71i_X1tU";
  return (
    <>
      <Header />
      <div className="about-main-container">
        <h1 className="about-main-heading">
          Spicy Cravings – The Right Place for Your Spicy 🌶️ Cravings!
        </h1>
        <section className="about-section-container odd">
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722515305/about-page-image-1_ajds4j.avif"
            alt="pizza sharing food"
            className="about-image"
          />
          <div>
            <h1 className="about-heading">About Spicy Cravings</h1>
            <p className="about-section-description">
              Welcome to Spicy Cravings, the ultimate destination for all your
              food indulgences in Pondicherry! We are passionate about bringing
              you a vibrant and delicious array of dishes that are sure to
              satisfy your cravings.
            </p>
          </div>
        </section>
        <section className="about-section-container even">
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722515305/about-page-image-2_tducbq.jpg"
            alt="pizza"
            className="about-image"
          />

          <p className="about-section-description">
            At Spicy Cravings, we specialize in crafting mouth-watering pizzas,
            juicy burgers, hearty sandwiches, and refreshing mojitos. Each dish
            is prepared with the freshest ingredients and a dash of love,
            ensuring that every bite is an explosion of flavor.
          </p>
        </section>
        <section className="about-section-container odd">
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722515771/about-page-image-3_apl5na.jpg"
            alt="burger"
            className="about-image"
          />

          <p className="about-section-description">
            Whether you're in the mood for a classic pepperoni pizza, a loaded
            burger, a gourmet sandwich, or a cool mojito to refresh your senses,
            Spicy Cravings is the right place for you. We are committed to
            providing an unforgettable dining experience that caters to all your
            taste buds.
          </p>
        </section>
        <section className="about-section-container even">
          <img
            src="https://res.cloudinary.com/dlefoxknm/image/upload/v1722515771/about-page-image-4_xeysln.jpg"
            alt="fast food plate"
            className="about-image"
          />

          <p className="about-section-description">
            So why wait? Give in to your cravings and order now! Let us take you
            on a culinary journey that will leave you wanting more.
          </p>
        </section>
        <section className="about-section-container">
          <ReactPlayer
            url={ckLiveYoutubeLink}
            controls
            width="80vw"
            height="70vh"
          />
          <h1 className="about-heading">
            How to run a cloud kitchen business with delivery apps
          </h1>
          <p className="about-section-description live-desc">
            In this live session, we explained how to run a cloud kitchen from
            scratch to an intermediate level. We covered topics such as applying
            for licenses, sourcing raw materials, reducing costs efficiently
            when starting your business, delivery partner app deductions, and
            approximate income and expenses in this business. We also addressed
            some commonly asked questions. We hope this live session has cleared
            some of your doubts. Feel free to reach out to us via WhatsApp,
            Instagram, or email for any queries. Your suggestions and feedback
            are always welcome.
          </p>
        </section>
        <Link to="/menu" className="home-navgivate-button about-order-button">
          Order Now
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default About;
