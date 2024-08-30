import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MaterialContext from '../Store/Context';
import FilterPanel from './FilterPanel';
import { FaFilter } from 'react-icons/fa';

const Materials = ({ searchItem }) => {
  const [materialsData, setMaterialsData] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    colors: [],
    genders: [],
    priceRange: [],
    types: [],
  });
  const cartCtx = useContext(MaterialContext);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setMaterialsData(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  function handleAddItem(item) {
    cartCtx.AddItem(item);
  }

  function handleRemoveItem(id) {
    cartCtx.removeItem(id);
  }

  // Check the quantity of an item in the cart
  const getItemQuantityInCart = (itemId) => {
    const cartItem = cartCtx.items.find((cartItem) => cartItem.id === itemId);
    return cartItem ? cartItem.cartquantity : 0; // Return the quantity or 0 if not in cart
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];

      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };
  const toggleFilterPanel = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const filteredMaterials = materialsData.filter((material) => {
    const matchesSearch =
      searchItem === '' ||
      material.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      material.type.toLowerCase().includes(searchItem.toLowerCase()) ||
      (material.color && material.color.toLowerCase().includes(searchItem.toLowerCase()));

    const matchesColor = filters.colors.length === 0 || filters.colors.includes(material.color);
    const matchesGender = filters.genders.length === 0 || filters.genders.includes(material.gender);

    // Dynamically handle price range filtering
    const matchesPrice =
      filters.priceRange.length === 0 ||
      filters.priceRange.some((range) => {
        const regex = /^(\d+)(?:-(\d+)|\+)$/; // Matches "min-max" or "min+"
        const match = range.match(regex);

        if (match) {
          const min = parseInt(match[1], 10);
          const max = match[2] ? parseInt(match[2], 10) : Infinity; // Handle "min+" as min to Infinity
          return material.price >= min && material.price <= max;
        }
        return false; // Fallback in case of incorrect format
      });

    const matchesType = filters.types.length === 0 || filters.types.includes(material.type);

    return matchesSearch && matchesColor && matchesGender && matchesPrice && matchesType;
  });

  return (
    <div className="materials-container">
    <button className="filter-button" onClick={toggleFilterPanel}>
    <FaFilter />
      </button>
      <div className={`filter-panel-wrapper ${isFilterVisible ? 'show-filter' : ''}`}>
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <ul id="materials">
        {filteredMaterials.map((material) => {
          const quantityInCart = getItemQuantityInCart(material.id); // Get current quantity in the cart
          return (
            <li key={material.id}>
              <article className="material-item">
                <h3>
                  {material.name} {material.type}
                </h3>
                <img src={material.imageURL} alt="img" />
            <div className = "price-addtocart-container">
                <p className="material-item-price">{material.price}</p>
                <div className="material-item-actions">
                  {quantityInCart > 0 ? (
                    <>
                      <button className= "material-item-actions" onClick={() => handleRemoveItem(material.id)}>-</button>
                      <span>{quantityInCart}</span>
                      <button className= "material-item-actions" onClick={() => handleAddItem(material)}> + </button>
                    </>
                  ) : (
                    <button className= "material-item-actions" onClick={() => handleAddItem(material)}>
                      Add to Cart
                    </button>
                  )}
                </div>
            </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Materials;
