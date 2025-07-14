import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { getAllCartItems } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      const userId = user._id;

      const res = await getAllCartItems(userId);
      if (res.status === 200) {
        setCartData(res.data.cart);
        calculateTotal(res.data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  const calculateTotal = (cart) => {
    const total = cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
    setCartTotal(total);
  };

  const isCartEmpty = cartData.length === 0;

  return (
    <div className='border-t pt-14 px-4 sm:px-16 md:px-32'>
      <div className='mb-6 text-3xl font-semibold text-center'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='space-y-6'>
        {cartData.map((item, index) => {
          const product = item.product;
          const quantity = item.quantity;

          return (
            <div
              key={index}
              className='flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 shadow-sm'
            >
              <div className='flex gap-4 items-center w-full sm:w-2/3'>
                <img className='w-20 h-20 object-cover rounded' src={product.image[0]} alt={product.name} />
                <div className='text-gray-800'>
                  <p className='text-base font-medium'>{product.name}</p>
                  <p className='text-sm mt-1 text-gray-500'>₹ {product.price.toFixed(2)} x {quantity}</p>
                </div>
              </div>

              <div className='flex items-center gap-4 mt-3 sm:mt-0'>
                <input
                  type="number"
                  min={1}
                  defaultValue={quantity}
                  readOnly
                  className='w-12 px-2 py-1 border text-center rounded'
                />
                <img
                  src={assets.bin_icon}
                  alt="Delete"
                  className='w-5 cursor-pointer'
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Section */}
      <div className='mt-10 flex justify-end'>
        <div className='w-full sm:w-[400px] border rounded-lg p-6 bg-gray-50 shadow-md'>
          <h2 className='text-lg font-semibold mb-4 text-gray-700'>Order Summary</h2>
          <div className='flex justify-between mb-2'>
            <p className='text-sm text-gray-600'>Subtotal</p>
            <p className='font-medium'>₹ {cartTotal.toFixed(2)}</p>
          </div>
          <div className='flex justify-between mb-4'>
            <p className='text-sm text-gray-600'>Shipping</p>
            <p className='font-medium text-green-600'>FREE</p>
          </div>
          <hr className='my-2' />
          <div className='flex justify-between font-semibold text-gray-800 text-lg'>
            <p>Total</p>
            <p>₹ {cartTotal.toFixed(2)}</p>
          </div>
          <button
            onClick={() => navigate('/place-order')}
            className={`w-full mt-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition duration-200 ${isCartEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isCartEmpty}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
