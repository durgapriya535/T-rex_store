
const FilterPanel = ({ filters, onFilterChange }) => {
  const availableColors = ['Red', 'Blue', 'Green','Black','Pink'];
  const availableGenders = ['Men', 'Women'];
  const priceRanges = ['0-250', '251-450', '450+'];
  const availableTypes = ['Polo', 'Hoodie', 'Basic'];

  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      {/* Color Filters */}
      <div className="filter-group">
        <h4>Colour</h4>
        {availableColors.map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              value={color}
              checked={filters.colors.includes(color)}
              onChange={() => onFilterChange('colors', color)}
            />
            {color}
          </label>
        ))}
      </div>

      {/* Gender Filters */}
      <div className="filter-group">
        <h4>Gender</h4>
        {availableGenders.map((gender) => (
          <label key={gender}>
            <input
              type="checkbox"
              value={gender}
              checked={filters.genders.includes(gender)}
              onChange={() => onFilterChange('genders', gender)}
            />
            {gender}
          </label>
        ))}
      </div>

      {/* Price Range Filters */}
      <div className="filter-group">
        <h4>Price</h4>
        {priceRanges.map((range) => (
          <label key={range}>
            <input
              type="checkbox"
              value={range}
              checked={filters.priceRange.includes(range)}
              onChange={() => onFilterChange('priceRange', range)}
            />
            {range}
          </label>
        ))}
      </div>

      {/* Type Filters */}
      <div className="filter-group">
        <h4>Type</h4>
        {availableTypes.map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={filters.types.includes(type)}
              onChange={() => onFilterChange('types', type)}
            />
            {type}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
