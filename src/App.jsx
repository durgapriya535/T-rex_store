import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import React Router components
import Header from './Components/Header';
import Materials from './Components/Materials.jsx';
import Modalcart from './Components/Modalcart.jsx'; // Import the CartPage component
import { MaterialContextProvider } from './Store/Context.jsx';
import Search from './Components/Search.jsx';

const App = () => {
  const [searchItem, setSearchItem] = useState("");

  // Handler to update search term
  function handleSearch(item) {
    setSearchItem(item);
  }

  return (
    <MaterialContextProvider>
      <Router> {/* Wrap the app with Router */}
        <Header />
        <ConditionalSearch handleSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Materials searchItem={searchItem} />} /> {/* Home/Materials Route */}
          <Route path="/cart" element={<Modalcart />} /> {/* Cart Page Route */}
        </Routes>
      </Router>
    </MaterialContextProvider>
  );
}

const ConditionalSearch = ({ handleSearch }) => {
  const location = useLocation(); // Get current location

  // Conditionally render Search component only on the home route
  if (location.pathname === '/') {
    return <Search handleSearch={handleSearch} />;
  }

  return null; 
}

export default App;
