import { useContext,useState,useEffect } from "react";
import MaterialContext from "../Store/Context"
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({searchInput}) => {
    const[cartCheck, setCartCheck]= useState(true)
    const cartCtx = useContext(MaterialContext);
    const TotalCartItems = cartCtx.items.reduce((totalNumberofItems, item)=>{
        return  totalNumberofItems+ item.cartquantity;
    },0)
    useEffect(() => {
        setCartCheck(TotalCartItems === 0);
      }, [TotalCartItems]);


  return (
    <>
    <header id = "main-header">
        <div id = "title">
            <img src = "/0104d32c-4ff4-4ebe-8601-9ae7470b33ae.webp" alt= "imgage"/>
            <h1 >T-REX Store</h1>
        </div>
        <nav>
        <a href ="/"> Products </a>

        </nav>
    <nav>
        {/* <button onClick = {handleOpenModal}> Cart({TotalCartItems})</button> */}
        <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" /> 
          <span> {cartCheck ? "Cart" : `Cart(${TotalCartItems})`}</span>
          </Link> 
    </nav>
    </header>
    {/* {showModal && <Modalcart onClose={handleCloseModal}/>} */}

    </>
 )
}

export default Header;