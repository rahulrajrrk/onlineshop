import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE } from '../config';

const Container = styled.div` max-width: 900px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); `;
const Title = styled.h2` text-align: center; color: #00cc66; margin-bottom: 2rem; `;
const OrderBox = styled.div` border: 1px solid #eee; border-radius: 10px; margin-bottom: 1.5rem; padding: 1rem; `;
const Select = styled.select` padding: 0.5rem; border-radius: 6px; `;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/orders`)
      .then(res => res.json())
      .then(setOrders);
  }, []);

  const updateStatus = (id, status) => {
    fetch(`${API_BASE}/api/orders/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    }).then(() => window.location.reload());
  };

  return (
    <Container>
      <Title>Manage Orders</Title>
      {orders.map((o, i) => (
        <OrderBox key={i}>
          <p><strong>Order ID:</strong> {o.id}</p>
          <p><strong>Customer:</strong> {o.userEmail}</p>
          <p><strong>Date:</strong> {o.date}</p>
          <ul>{o.items.map((item, j) => <li key={j}>{item.quantity} × {item.name}</li>)}</ul>
          <p><strong>Total:</strong> ₹{o.total}</p>
          <Select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
        </OrderBox>
      ))}
    </Container>
  );
}