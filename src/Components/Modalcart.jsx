import { useContext } from 'react';
import MaterialContext from '../Store/Context';
import { FaTrash } from 'react-icons/fa6';

const CartPage = () => {
  const cartCtx = useContext(MaterialContext);
  const totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.cartquantity * item.price;
  }, 0);

  function handleAdd(item) {
    cartCtx.AddItem(item);
  }

  function handleRemove(id) {
    cartCtx.removeItem(id);
  }
   
  function handleDelete(id){
    cartCtx.deleteItem(id);
  }

  return (
    <div className="cart-page">
      <h2>Cart Items</h2>
      <ul>
        {cartCtx.items.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="cart-image-container">
              <img src={item.imageURL} alt="img" className="cart-image" />
            </div>
            <div className="cart-item-details">
              <span>{item.name} - Rs {item.price}</span>
              <div className="cart-item-actions">
                <button onClick={() => handleRemove(item.id)}> - </button>
                <span>{item.cartquantity}</span>
                <button onClick={() => handleAdd(item)}> + </button>
                <button onClick = {()=> handleDelete(item.id)}> <FaTrash /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total Price: Rs {totalPrice}</h3>
    </div>
  );
};

export default CartPage;
