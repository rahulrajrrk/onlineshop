import React, { useEffect, useState } from 'react';
import { API_BASE } from '../config';

export default function Checkout() {
  const email = localStorage.getItem('email');
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/cart/${email}`)
      .then(res => res.json())
      .then(setCart);
  }, [email]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail: email,
        address,
        items: cart,
        total
      })
    })
      .then(res => res.json())
      .then(data => {
        setPlaced(true);
        setOrderId(data.orderId);
      });
  };

  if (placed) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Order Placed!</h2>
        <p>Your Order ID: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checkout</h2>
      <textarea
        rows={3}
        placeholder="Enter address..."
        onChange={e => setAddress(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <h3>Order Summary:</h3>
      {cart.map((item, i) => (
        <div key={i}>{item.quantity} × {item.name} — ₹{item.price * item.quantity}</div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
