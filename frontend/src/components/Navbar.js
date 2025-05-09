import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #00cc66;
  padding: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  margin-right: 1rem;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Customer</NavLink>
      <NavLink to="/admin">Admin Dashboard</NavLink>
      <NavLink to="/admin/add-product">Add Product</NavLink>
    </Nav>
  );
}
