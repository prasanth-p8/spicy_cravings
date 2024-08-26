import "./index.scss";

function MenuFoodLabelFilter({ filters, setFilters, filterFoodLabel }) {
  //funciton used to handle the food label filters
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log(checked);
    setFilters(() => {
      if (checked) {
        filterFoodLabel(name);
        return {
          veg: name === "Veg",
          egg: name === "Egg",
          nonVeg: name === "Non%20Veg",
        };
      } else {
        filterFoodLabel("");
        return {
          veg: false,
          egg: false,
          nonVeg: false,
        };
      }
    });
  };

  const { veg, egg, nonVeg } = filters;
  return (
    <div className="filter-foodlabel-checkboxes">
      <div className="foodlabel-checkbox-container">
        <input
          type="checkbox"
          name="Veg"
          className="food-label-input"
          id="veg"
          checked={veg}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="veg">Veg</label>
      </div>
      <div className="foodlabel-checkbox-container">
        <input
          type="checkbox"
          name="Egg"
          id="egg"
          checked={egg}
          className="food-label-input egg"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="egg">Egg</label>
      </div>
      <div className="foodlabel-checkbox-container">
        <input
          type="checkbox"
          name="Non%20Veg"
          id="nonVeg"
          checked={nonVeg}
          className="food-label-input non-veg"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="nonVeg">Non Veg</label>
      </div>
    </div>
  );
}

export default MenuFoodLabelFilter;
