import './App.css';
import { useState } from 'react';
import productData from './assets/jsonData'; // Adjust the import path as necessary

const categoryColors = {
  AntiAging: 'darkred',
  CellAction: 'darkblue',
  EffectPlus: 'pink',
  OilySkin: 'lightblue',
  MD: 'black',
  SensitiveSkin: 'orange',
  EyeCare: 'purple',
  FitForAll: 'green',
  DrySkin: "yellow",
  Body: "lightgreen",
  Specialty: "brown"
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Generate suggestions based on the search term
    if (value) {
      const filteredSuggestions = [];
      Object.keys(productData).forEach(category => {
        productData[category].forEach(product => {
          if (product.product.toLowerCase().includes(value) && !filteredSuggestions.includes(product.product)) {
            filteredSuggestions.push(product.product);
          }
        });
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="product-container">
        {Object.keys(productData).map(category => {
          const filteredProducts = productData[category].filter(product =>
            product.product.toLowerCase().includes(searchTerm)
          );

          return filteredProducts.length > 0 && (
            <div key={category} style={{ backgroundColor: categoryColors[category], padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
              <h2 style={{ color: 'white' }}>{category}</h2>
              <div className="card-container">
                {filteredProducts.map((product, index) => (
                  <div className="card" key={index}>
                    <h3>{product.product}</h3>
                    <p>{product.unit} units</p>
                    <p>{product.price} ₪</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
