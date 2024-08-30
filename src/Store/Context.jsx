import { useReducer, createContext, useState } from 'react';
import ModalError from '../Components/ModalError';

// Create the context
export const MaterialContext = createContext({
  items: [],
  AddItem: () => {},
  removeItem: () => {},
  deleteItem: () => {},
  error: "",
});

function reducer(state, action) {
  const updatedItems = [...state.items];

  if (action.type === 'ADD_ITEM') {
    const existingItemsIndex = state.items.findIndex((item) => item.id === action.item.id);

    if (existingItemsIndex > -1) {
      const existingItem = state.items[existingItemsIndex];
      const updatedItem = { ...existingItem, cartquantity: existingItem.cartquantity + 1 };

      if (existingItem.cartquantity < existingItem.quantity) {
        updatedItems[existingItemsIndex] = updatedItem;
        return { ...state, items: updatedItems, error: null };
      } else {
        return { ...state, error: "The stock is not available" };
      }
    } else {
      updatedItems.push({ ...action.item, cartquantity: 1 });
      return { ...state, items: updatedItems, error: null };
    }
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];

    if (existingItem.cartquantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = { ...existingItem, cartquantity: existingItem.cartquantity - 1 };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems, error: null };
  }

  if (action.type === "DELETE_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

    if (existingCartItemIndex > -1) { // Ensure the item exists
      updatedItems.splice(existingCartItemIndex, 1); // Remove the item completely
    }

    return { ...state, items: updatedItems, error: null };
  }

  if (action.type === 'CLEAR_ERROR') {
    return { ...state, error: null };
  }

  return state;
}

export function MaterialContextProvider({ children }) {
  const [cartItems, dispatchCartAction] = useReducer(reducer, { items: [], error: null });
  const [showModal, setShowModal] = useState(false);

  function AddItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });

    if (cartItems.error) {
      setShowModal(true);
    }
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });

    if (cartItems.error) {
      setShowModal(true);
    }
  }

  function deleteItem(id) {
    dispatchCartAction({ type: 'DELETE_ITEM', id });

    if (cartItems.error) {
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    dispatchCartAction({ type: 'CLEAR_ERROR' });
  }

  const contextValue = {
    items: cartItems.items,
    AddItem,
    removeItem,
    deleteItem,
    error: cartItems.error,
  };

  return (
    <MaterialContext.Provider value={contextValue}>
      {children}
      {showModal && <ModalError message={cartItems.error} onClose={handleCloseModal} />}
    </MaterialContext.Provider>
  );
}

export default MaterialContext;
