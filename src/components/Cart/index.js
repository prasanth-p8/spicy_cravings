import { useContext } from "react";
import CartContext from "../CartContext";
import { Link } from "react-router-dom";
import CartSummary from "../CartSummary";
import Header from "../Header";
import Footer from "../Footer";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import "./index.scss";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  //remove all items in the cart
  const removeAllCartItems = () => {
    setCart([]);
  };

  //selected item is removed from the cart
  const removeTheCartItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  //increase quantity of a particular item selected in the cart
  const increaseQuantityCart = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //decrease quantity of a particular item selected in the cart
  const decreaseQuantityCart = (id) => {
    const findItemQuantity = cart.find((item) => item.id === id);
    console.log(findItemQuantity);
    if (findItemQuantity.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className="cart-main-container">
        <h1>
          Your <span>Cart</span>
        </h1>
        {cart.length !== 0 && (
          <div className="cart-header-container">
            <Link to="menu" className="back-to-menu-link">
              <IoIosArrowBack size={25} />
              <p>Back to Menu</p>
            </Link>
            <button
              className="button remove-all-cart-item-button"
              onClick={removeAllCartItems}
            >
              <p>Remove All</p>
              <MdOutlineRemoveShoppingCart size={25} />
            </button>
          </div>
        )}
        {cart.length !== 0 ? (
          <>
            <ul className="cart-item-list">
              {cart.map((item) => {
                const {
                  id,
                  itemName,
                  price,
                  foodLabel,
                  mustTry,
                  imgUrl,
                  quantity,
                } = item;

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
                  <li key={id} className="main-each-cart-item">
                    <button
                      className="button cart-item-delete-button"
                      onClick={() => removeTheCartItem(id)}
                    >
                      <IoCloseSharp size={30} />
                    </button>
                    <div className="each-cart-item">
                      <img
                        src={foodLabelImg}
                        alt={foodLabel}
                        className="food-label-img"
                      />
                      {mustTry === "Yes" && (
                        <img
                          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723031825/must_try_dish_yzmjh9.png"
                          alt="must try dish"
                          className="must-try-dish-img"
                        />
                      )}
                      <img src={imgUrl} alt={itemName} className="item-img" />
                      <div className="cart-item-details-container">
                        <div className="cart-item-container">
                          <p className="cart-item-label">Item:</p>
                          <p className="cart-item-value ">{itemName}</p>
                        </div>
                        <div className="cart-item-container">
                          <p className="cart-item-label">Price:</p>
                          <p className="cart-item-value">&#8377; {price}</p>
                        </div>
                        <div className="cart-item-container">
                          <p className="cart-item-label">Quantity:</p>
                          <div className="item-quantity-container">
                            <button
                              className="button quantity-button"
                              onClick={() => decreaseQuantityCart(id)}
                            >
                              <img
                                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723031305/Item_Minus_Button_pnxxn7.png"
                                alt="minus item button"
                                className="quantity-item-button"
                              />
                            </button>
                            <p className="item-quantity">{quantity}</p>
                            <button
                              className="button quantity-button"
                              onClick={() => increaseQuantityCart(id)}
                            >
                              <img
                                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723031305/Item_Plus_Button_d3sa7k.png"
                                alt="plus item button"
                                className="quantity-item-button"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="cart-item-container">
                          <p className="cart-item-label">Subtotal:</p>
                          <p className="cart-item-value">
                            &#8377; {price * quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <CartSummary />
          </>
        ) : (
          <div className="empty-cart-view">
            <img
              src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723480954/Cart_Empty_yr0o9f.jpg"
              alt="empty cart"
              className="empty-cart-img"
            />
            <Link to="menu">
              <button className="button empty-cart-button">Explore Menu</button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
