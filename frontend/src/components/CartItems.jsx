import React, { useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";

const CartItems = () => {
  // Dummy data for cart items
  const initialCartItems = [
    {
      name: "Apple",
      quantity: 2,
      price: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1590005354167-6da97870c757?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Banana",
      quantity: 3,
      price: 20,
      imageUrl:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Orange",
      quantity: 1,
      price: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1586439702132-55ce0da661dd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Milk",
      quantity: 1,
      price: 50,
      imageUrl:
        "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bread",
      quantity: 2,
      price: 15,
      imageUrl:
        "https://images.unsplash.com/photo-1554795808-3231c32711cf?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Eggs",
      quantity: 1,
      price: 60,
      imageUrl:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-2">Your Cart</h2>
      <div className="grid grid-cols-[350px_1.5fr_2fr_1.5fr] justify-items-center mb-2 mt-6 text-sm text-black-500 font-semibold">
        <div></div>
        <div>Price/unit</div>
        <div>Quantity</div>
        <div>Item Price</div>
      </div>
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_6fr_2fr_3fr_2fr] justify-items-center items-center p-4 bg-white shadow-md rounded-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="ml-4 justify-self-start">
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </div>
            <p className="mr-2 text-lg font-semibold">Tk.{item.price}</p>
            <div className="flex items-center gap-2">
              <button
                className="px-1 py-1 rounded-full bg-teal-600 hover:bg-teal-700 transition-all"
                onClick={() => handleDecreaseQuantity(index)}
              >
                <HiOutlineMinus color="white" />
              </button>
              <p className="mx-2 text-lg font-semibold">{item.quantity}</p>
              <button
                className="px-1 py-1 rounded-full bg-teal-600 hover:bg-teal-700 transition-all"
                onClick={() => handleIncreaseQuantity(index)}
              >
                <HiOutlinePlus color="white" />
              </button>
            </div>
            <div className="text-right ml-6">
              <p className="text-lg font-semibold">
                Tk.{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-6 justify-end gap-28 mr-4">
        <h3 className="text-xl font-semibold">Total Amount:</h3>
        <h3 className="text-xl font-semibold">Tk. {totalPrice.toFixed(2)}</h3>
      </div>
      <div className="mt-4 text-right">
        <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItems;