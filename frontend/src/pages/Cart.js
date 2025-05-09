import React, { useEffect, useState } from 'react';
import { API_BASE } from '../config';

export default function Cart() {
  const email = localStorage.getItem('email');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/cart/${email}`)
      .then(res => res.json())
      .then(setCart);
  }, [email]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cart.map((item, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <strong>{item.name}</strong> — {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={() => window.location.href = '/customer/checkout'}>Proceed to Checkout</button>
    </div>
  );
}
