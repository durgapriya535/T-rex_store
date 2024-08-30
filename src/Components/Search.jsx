import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = ({handleSearch}) => {
    const[searchInput, setSearchInput] =useState("")

    function handleChangeSearch(e){
        setSearchInput(e.target.value)
    }
  return (
        <div className="search-container">
            <input 
               type="text" 
               placeholder="Search products..." 
               onChange={handleChangeSearch}
               className= "search-input" />
               <button className="search-button" onClick = {() => handleSearch(searchInput)}>
               <FaSearch className="icon" />
               </button>
        </div>
  )
}

export default Search