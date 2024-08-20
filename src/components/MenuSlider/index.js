import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const menuItems = [
  {
    id: 0,
    name: "Burger",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021877/Menu_Slider/Burger_b8br8t.png",
  },
  {
    id: 1,
    name: "Pizza",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021877/Menu_Slider/Pizza_mchetd.png",
  },
  {
    id: 2,
    name: "Bread Omelette",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021877/Menu_Slider/Bread_Omelette_aiefyt.png",
  },
  {
    id: 3,
    name: "Fried Momos",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021876/Menu_Slider/Fried_Momos_xknvww.png",
  },
  {
    id: 4,
    name: "Sandwich",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021878/Menu_Slider/Sandwich_ffdtoc.png",
  },
  {
    id: 5,
    name: "Coolers",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021877/Menu_Slider/Juice_bzb8tp.jpg",
  },
  {
    id: 6,
    name: "Fries",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021877/Menu_Slider/Fries_wdpkta.png",
  },
  {
    id: 7,
    name: "Maggi",
    imgUrl:
      "https://res.cloudinary.com/dlefoxknm/image/upload/v1723021877/Menu_Slider/Maggi_ddmhsy.jpg",
  },
];

function ReactSlider(props) {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const { selectCategory } = props;
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {menuItems.map((item) => {
          const { id, name, imgUrl } = item;

          const filterCategory = () => {
            selectCategory(name);
          };
          return (
            <div key={id} onClick={filterCategory}>
              <div className="slider-item">
                <img src={imgUrl} alt={name} className="slider-image" />
                <p className="slider-item-name">{name}</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default ReactSlider;
