import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE } from '../config';

const Container = styled.div` max-width: 800px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); `;
const Title = styled.h2` text-align: center; color: #00cc66; margin-bottom: 2rem; `;
const OrderBox = styled.div` border: 1px solid #eee; border-radius: 10px; margin-bottom: 1.5rem; padding: 1rem; `;
const Status = styled.span` font-weight: bold; color: ${({ status }) => status === 'Delivered' ? '#00cc66' : '#ffaa00'}; `;

export default function CustomerOrders() {
  const email = localStorage.getItem('email');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/orders/${email}`)
      .then(res => res.json())
      .then(setOrders);
  }, [email]);

  return (
    <Container>
      <Title>Your Orders</Title>
      {orders.map((o, i) => (
        <OrderBox key={i}>
          <p><strong>Order ID:</strong> {o.id}</p>
          <p><strong>Status:</strong> <Status status={o.status}>{o.status}</Status></p>
          <p><strong>Date:</strong> {o.date}</p>
          <ul>{o.items.map((item, j) => <li key={j}>{item.quantity} × {item.name}</li>)}</ul>
          <p><strong>Total:</strong> ₹{o.total}</p>
        </OrderBox>
      ))}
    </Container>
  );
}
