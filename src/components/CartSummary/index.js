import { useContext, useState } from "react";
import CartContext from "../CartContext";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { TbShoppingCartShare } from "react-icons/tb";
import "./index.scss";

function CartSummary() {
  const [coupounStatus, setCoupounStatus] = useState(true);
  const [orderConformation, setOrderConformation] = useState(false);
  const { cart, setCart, headerLocation } = useContext(CartContext);

  //total price of the cart is calculated using forEach
  let totalCartPrice = 0;
  cart.forEach((item) => {
    totalCartPrice += item.price * item.quantity;
  });

  //total quantities of items in the cart is calculated using forEach
  let totalCartQuantities = 0;
  cart.forEach((item) => {
    totalCartQuantities += item.quantity;
  });

  //checking applied coupoun is valid or not
  const checkCoupounStatus = () => {
    setCoupounStatus(false);
  };

  //placing and canceling order conformation popup button toggle
  const toggleOrderConformation = () => {
    setOrderConformation(!orderConformation);
  };

  //final conformation for placing the order in the cart
  const placeTheOrder = () => {
    setOrderConformation(!orderConformation);
    setCart([]);
  };

  return (
    <div className="cart-summary-container">
      <div className="coupoun-code-container">
        <input
          type="text"
          placeholder="Coupoun Code"
          className="coupoun-code-input"
        />
        {!coupounStatus && <p className="coupoun-status">*Invalid Coupoun</p>}
        <button
          className="button apply-coupoun-button"
          onClick={checkCoupounStatus}
        >
          <p>Apply Coupoun</p>
          <FaArrowAltCircleRight size={30} />
        </button>
      </div>
      <div className="cart-summary-detail-container">
        <h1>Cart Summary</h1>
        <div className="cart-summary-each-container">
          <h2>Cart Items:</h2>
          <h1>{cart.length}</h1>
        </div>
        <div className="cart-summary-each-container">
          <h2>Cart Total:</h2>
          <h1>&#8377; {totalCartPrice}</h1>
        </div>
        <button
          className="button place-order-button"
          onClick={toggleOrderConformation}
        >
          <TbShoppingCartShare size={30} />
          <p>Place Order</p>
        </button>
        {orderConformation && (
          <div className="cart-order-conformation-container">
            <div className="order-conformation-container">
              <h1 className="order-conformation-heading">Order Conformation</h1>
              <table className="order-conformation-table">
                <thead className="table-heading-row">
                  <tr>
                    <th className="table-heading-name">Name</th>
                    <th className="table-heading-name">Price</th>
                    <th className="table-heading-name">Quantity</th>
                    <th className="table-heading-name">Subtotal</th>
                  </tr>
                </thead>
                {cart.map((item) => {
                  const { id, itemName, price, foodLabel, quantity } = item;

                  let foodLabelImg;
                  switch (foodLabel) {
                    case "Non Veg":
                      foodLabelImg =
                        "https://res.cloudinary.com/dlefoxknm/image/upload/v1722947835/Non_Veg_e2z0uo.png";
                      break;
                    case "Veg":
                      foodLabelImg =
                        "https://res.cloudinary.com/dlefoxknm/image/upload/v1722947835/Veg_xje97w.png";
                      break;
                    case "Egg":
                      foodLabelImg =
                        "https://res.cloudinary.com/dlefoxknm/image/upload/v1722947835/Egg_Food_nv4uxt.png";
                      break;
                    default:
                      return null;
                  }
                  return (
                    <tr key={id} className="table-cart-item-row">
                      <td className="cart-item-data-cell item-name-row">
                        <img
                          src={foodLabelImg}
                          alt={foodLabel}
                          className="food-label-img-cart"
                        />
                        <p>{itemName}</p>
                      </td>
                      <td className="cart-item-data-cell">{price}</td>
                      <td className="cart-item-data-cell">{quantity}</td>
                      <td className="cart-item-data-cell">
                        {price * quantity}
                      </td>
                    </tr>
                  );
                })}
              </table>
              <div className="table-ending-container">
                <p>{totalCartQuantities}</p>
                <p>&#8377; {totalCartPrice}</p>
              </div>
              <div className="customer-location-container">
                <p>LOCATION: {headerLocation}</p>
              </div>
              <div className="cart-order-conformation-buttons">
                <button
                  className="button conform-button"
                  onClick={placeTheOrder}
                >
                  Conform
                </button>
                <button
                  className="button cancel-button"
                  onClick={toggleOrderConformation}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
