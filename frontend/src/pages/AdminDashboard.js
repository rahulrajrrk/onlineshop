import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #00cc66;
  color: white;
  padding: 2rem 1rem;
`;

const SidebarItem = styled.div`
  margin-bottom: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #00cc66;
  margin-bottom: 2rem;
`;

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container>
      <Sidebar>
        <h3 style={{ color: 'white', marginBottom: '2rem' }}>Admin Panel</h3>
        <SidebarItem onClick={() => navigate('/admin/add-product')}>➕ Add Product</SidebarItem>
        <SidebarItem onClick={() => navigate('/admin/products')}>📦 Product List</SidebarItem>
        <SidebarItem onClick={() => navigate('/admin/orders')}>📑 Manage Orders</SidebarItem>
        <SidebarItem onClick={() => navigate('/admin/reports')}>📊 Reports</SidebarItem>
        <SidebarItem onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}>🚪 Logout</SidebarItem>
      </Sidebar>

      <Content>
        <Title>Welcome Admin 👋</Title>
        <p>Select an option from the left menu to manage the store.</p>
      </Content>
    </Container>
  );
}