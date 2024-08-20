import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./index.scss";

function OrderHistory() {
  return (
    <>
      <Header />
      <div className="order-history-main-container">
        <h1>Order History</h1>
        <div className="no-order-history-container">
          <div className="no-order-history-sub-container">
            <img
              src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723567495/NoOrderHistoryImg_q68gdy.png"
              alt="no order history"
              className="no-order-history-img"
            />
            <Link to="menu" className="dine-into-menu-link">
              Dive Into Menu
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderHistory;
