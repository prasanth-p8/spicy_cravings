import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ReactSlider from "../MenuSlider";
import Header from "../Header";
import Footer from "../Footer";
import CartContext from "../CartContext";
import MenuFoodLabelFilter from "../MenuFoodLabelFilter";
import { FaStar, FaChevronRight } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { BsSearchHeart } from "react-icons/bs";
import "./index.scss";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

function Menu() {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    data: null,
  });
  const [quantities, setQuantities] = useState({});
  const [searchItem, setSearchItem] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodLabelFilter, setFoodLabelFilter] = useState("");
  const [filters, setFilters] = useState({
    veg: false,
    egg: false,
    nonVeg: false,
  });

  const { cart, setCart } = useContext(CartContext);

  const displayMenuContent = async () => {
    setApiStatus({
      status: apiConstants.inProgress,
      data: null,
    });

    const jwtToken = Cookies.get("jwt_token");
    const url = `https://spicy-carvings-backend.onrender.com/menu?search_item=${searchItem}&food_category=${foodCategory}&label=${foodLabelFilter}`;

    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const responseData = await response.json();

      const formattedData = responseData.map((menu) => ({
        id: menu.item_code,
        itemName: menu.item_name,
        category: menu.category,
        price: menu.price,
        foodLabel: menu.food_label,
        mustTry: menu.must_try,
        imgUrl: menu.img_url,
      }));

      setApiStatus({
        status: apiConstants.success,
        data: formattedData,
      });

      const initialQuantity = {};
      formattedData.forEach((item) => {
        initialQuantity[item.id] = 0;
      });

      setQuantities(initialQuantity);
    } else {
      const responseData = await response.text();
      setApiStatus({
        status: apiConstants.failure,
        data: responseData,
      });
    }
  };

  const removeMenuItemFromCart = (id) => {
    const findItemQuantity = cart.find((item) => item.id === id);
    const selectedMenuItemQuantity = quantities[id];
    console.log(selectedMenuItemQuantity);
    if (selectedMenuItemQuantity > 0) {
      if (findItemQuantity.quantity > 1) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      } else {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      }
    }
  };

  const decreaseItemQuantity = (id) => {
    setQuantities((prevQuantity) => ({
      ...prevQuantity,
      [id]: prevQuantity[id] > 0 ? prevQuantity[id] - 1 : 0,
    }));

    removeMenuItemFromCart(id);
  };

  const addMenuItemToCart = (id, quantity) => {
    const { data } = apiStatus;
    const findItemAvailable = cart.find((item) => item.id === id);
    const addItemToCart = data.find((item) => item.id === id);
    if (findItemAvailable === undefined) {
      setCart((prevCart) => [...prevCart, { ...addItemToCart, quantity }]);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };
  console.log(cart);
  const increaseItemQuantity = (id) => {
    setQuantities((prevQuantity) => {
      const updateQuantity = prevQuantity[id] ? prevQuantity[id] + 1 : 1;

      return {
        ...prevQuantity,
        [id]: updateQuantity,
      };
    });
    addMenuItemToCart(id, quantities[id] + 1);
  };

  const selectCategory = (name) => {
    setFoodCategory((prevState) => (prevState === name ? "" : name));
  };

  useEffect(() => {
    displayMenuContent();
  }, [foodCategory, foodLabelFilter]);

  const searchMenuItem = () => {
    if (searchItem !== "") {
      displayMenuContent();
      setSearchItem("");
    }
  };

  const searchMenuItemInput = (event) => {
    if (event.key === "Enter") {
      if (searchItem !== "") {
        displayMenuContent();
        setSearchItem("");
      }
    }
  };

  const clearMenuFilter = () => {
    setFoodLabelFilter("");
    setFoodCategory("");
    setFilters({ veg: false, egg: false, nonVeg: false });
    displayMenuContent();
  };

  const renderSuccessView = () => {
    const { data } = apiStatus;

    const burgerList = data.filter((menu) => menu.category === "Burger");
    const pizzaList = data.filter((menu) => menu.category === "Pizza");
    const breadOmeletteList = data.filter(
      (menu) => menu.category === "Bread Omelette"
    );
    const friedMomosList = data.filter(
      (menu) => menu.category === "Fried Momos"
    );
    const sandwichList = data.filter((menu) => menu.category === "Sandwich");
    const coolersList = data.filter((menu) => menu.category === "Coolers");
    const friesList = data.filter((menu) => menu.category === "Fries");
    const maggiList = data.filter((menu) => menu.category === "Maggi");

    const menuList = (item) => {
      const { id, itemName, price, foodLabel, mustTry, imgUrl } = item;

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
        <li key={id} className="each-menu-item">
          <img src={foodLabelImg} alt={foodLabel} className="food-label-img" />
          {mustTry === "Yes" && (
            <img
              src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723031825/must_try_dish_yzmjh9.png"
              alt="must try dish"
              className="must-try-dish-img"
            />
          )}
          <img src={imgUrl} alt={itemName} className="item-img" />
          <p>{itemName}</p>
          <div className="price-rating-container">
            <p className="item-price">&#8377; {price}</p>
            <div className="item-rating-container">
              <FaStar fill="#ffef5e" size={24} />
              <p className="customer-rating">4.9</p>
            </div>
          </div>
          <div className="item-quantity-container">
            <button
              className="button quantity-button"
              onClick={() => decreaseItemQuantity(id)}
            >
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723031305/Item_Minus_Button_pnxxn7.png"
                alt="minus item button"
                className="quantity-item-button"
              />
            </button>
            <p className="item-quantity">{quantities[id]}</p>
            <button
              className="button quantity-button"
              onClick={() => increaseItemQuantity(id)}
            >
              <img
                src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723031305/Item_Plus_Button_d3sa7k.png"
                alt="plus item button"
                className="quantity-item-button"
              />
            </button>
          </div>
        </li>
      );
    };

    const itemText = cart.length >= 2 ? "Items" : "Item";

    return (
      <>
        <Header />
        <div className="menu-main-contaier">
          <h1 className="menu-main-heading">What's on your mind?</h1>
          <ReactSlider selectCategory={selectCategory} />
          <div className="clear-filter-button-container">
            <button
              className="button clear-filter-button"
              onClick={clearMenuFilter}
            >
              <FcClearFilters size={25} />
              <p>Clear All Filters</p>
            </button>
          </div>
          <div className="menu-filter-container">
            <div className="search-input-container">
              <input
                type="search"
                placeholder="search"
                className="menu-search-input"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyDown={searchMenuItemInput}
              />
              <button
                className="button menu-search-button"
                onClick={searchMenuItem}
              >
                <BsSearchHeart size={25} />
              </button>
            </div>
            <MenuFoodLabelFilter
              filters={filters}
              setFilters={setFilters}
              filterFoodLabel={setFoodLabelFilter}
            />
          </div>
          {data.length !== 0 ? (
            <ul className="category-menu-list">
              <li>
                {burgerList.length !== 0 ? (
                  <h1>Burger ({burgerList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {burgerList.map((item) => menuList(item))}
                </ul>
              </li>
              <li>
                {pizzaList.length !== 0 ? (
                  <h1>Pizza ({pizzaList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {pizzaList.map((item) => menuList(item))}
                </ul>
              </li>
              <li>
                {breadOmeletteList.length !== 0 ? (
                  <h1>Bread Omelette ({breadOmeletteList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {breadOmeletteList.map((item) => menuList(item))}
                </ul>
              </li>
              <li>
                {friedMomosList.length !== 0 ? (
                  <h1>Fried Momos ({friedMomosList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {friedMomosList.map((item) => menuList(item))}
                </ul>
              </li>
              <li>
                {sandwichList.length !== 0 ? (
                  <h1>Sandwich ({sandwichList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {sandwichList.map((item) => menuList(item))}
                </ul>
              </li>
              <li>
                {coolersList.length !== 0 ? (
                  <h1>Coolers ({coolersList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {coolersList.map((item) => menuList(item))}
                </ul>
              </li>
              <li>
                {friesList.length !== 0 ? (
                  <h1>Fries ({friesList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {friesList.map((item) => menuList(item))}
                </ul>
              </li>
              <li>
                {maggiList.length !== 0 ? (
                  <h1>Maggi ({maggiList.length})</h1>
                ) : (
                  ""
                )}
                <ul className="each-category-list">
                  {maggiList.map((item) => menuList(item))}
                </ul>
              </li>
            </ul>
          ) : (
            <div className="no-menu-found-container">
              <div className="no-menu-found-sub-container">
                <img
                  src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723118288/No_Menu_Found_s0g7dg.jpg"
                  alt="no menu found"
                  className="no-menu-found"
                />
                <h1>NO MENU FOUND</h1>
                <p>
                  Looks like your search doesn't match with menu items. Explore
                  some other menu we have!
                </p>
                <button
                  className="button no-menu-found-button"
                  onClick={clearMenuFilter}
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}
          {cart.length > 0 && (
            <div className="item-cart-popup-container">
              <div className="item-cart-popup">
                <p>
                  <span className="cart-count-number">{cart.length}</span>
                  {itemText} added
                </p>
                <Link to="cart" className="view-cart-link">
                  <p>View Cart</p>
                  <FaChevronRight size={25} />
                </Link>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  };

  const renderLoadingView = () => {};

  const renderFailureView = () => {};

  const renderMenuPage = () => {
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

  return renderMenuPage();
}

export default Menu;
