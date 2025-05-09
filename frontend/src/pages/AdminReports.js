import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE } from '../config';

const Container = styled.div` max-width: 800px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); `;
const StatBox = styled.div` display: flex; flex-wrap: wrap; gap: 1rem; `;
const Stat = styled.div` flex: 1 1 45%; background: #f8f8f8; padding: 1rem; border-radius: 10px; text-align: center; `;
const Label = styled.p` font-weight: bold; `;
const Value = styled.h3` color: #00cc66; `;

export default function AdminReports() {
  const [report, setReport] = useState({ products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/products`).then(res => res.json()),
      fetch(`${API_BASE}/api/orders`).then(res => res.json())
    ]).then(([products, orders]) => {
      const revenue = orders.reduce((sum, o) => sum + o.total, 0);
      setReport({ products: products.length, orders: orders.length, revenue });
    });
  }, []);

  return (
    <Container>
      <h2 style={{ textAlign: 'center', color: '#00cc66' }}>Admin Reports</h2>
      <StatBox>
        <Stat><Label>Total Products</Label><Value>{report.products}</Value></Stat>
        <Stat><Label>Total Orders</Label><Value>{report.orders}</Value></Stat>
        <Stat><Label>Total Revenue</Label><Value>₹{report.revenue}</Value></Stat>
      </StatBox>
    </Container>
  );
}
