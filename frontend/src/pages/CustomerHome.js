import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE } from '../config';

const Page = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #f4f4f4;
  padding: 2rem 1rem;
`;

const Category = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
  cursor: pointer;
  color: ${({ selected }) => (selected ? '#00cc66' : '#333')};
`;

const Content = styled.div`
  flex: 1;
  background-color: #f8f9fa;
`;

const Navbar = styled.div`
  background-color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const Logo = styled.h2`
  color: #00cc66;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const Profile = styled.div`
  cursor: pointer;
  position: relative;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 0.75rem;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 10;
`;

const ProductGrid = styled.div`
  display: grid;
  padding: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.75rem;
`;

const Name = styled.h4`
  margin: 0.5rem 0 0.25rem;
`;

const Desc = styled.p`
  font-size: 0.85rem;
  color: #666;
  text-align: center;
`;

const Weight = styled.p`
  font-size: 0.85rem;
  color: #444;
`;

const Price = styled.p`
  font-weight: bold;
  color: #00cc66;
`;

const Button = styled.button`
  background-color: #00cc66;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #00994d;
  }
`;

export default function CustomerHome() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
    document.body.style.backgroundColor = darkMode ? '#fff' : '#121212';
    document.body.style.color = darkMode ? '#000' : '#fff';
  };

  const addToCart = (product) => {
    const userEmail = localStorage.getItem('email');
    const payload = {
      userEmail,
      item: { ...product, quantity: 1 }
    };
    fetch(`${API_BASE}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(() => alert('Added to cart!'));
  };

  return (
    <Page>
      <Sidebar>
        <h3>Categories</h3>
        <Category selected={category === 'all'} onClick={() => setCategory('all')}>All</Category>
        <Category selected={category === 'fruits'} onClick={() => setCategory('fruits')}>Fruits</Category>
        <Category selected={category === 'vegetables'} onClick={() => setCategory('vegetables')}>Vegetables</Category>
      </Sidebar>

      <Content>
        <Navbar>
          <Logo>🛒 ShopNow</Logo>
          <RightMenu>
            <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/customer/cart'}>🛍️ Cart</div>
            <Profile onClick={() => setShowProfile(!showProfile)}>👤</Profile>
            <Dropdown show={showProfile}>
              <p><strong>Name:</strong> Customer</p>
              <p style={{ cursor: 'pointer' }} onClick={toggleTheme}>
                Toggle {darkMode ? 'Light' : 'Dark'} Mode
              </p>
              <p style={{ cursor: 'pointer' }} onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
              }}>
                Logout
              </p>
            </Dropdown>
          </RightMenu>
        </Navbar>

        <ProductGrid>
          {filtered.map((p, i) => (
            <Card key={i}>
              <Image src={`${API_BASE}${p.image}`} alt={p.name} />
              <Name>{p.name}</Name>
              <Weight>{p.weight}</Weight>
              <Desc>{p.description}</Desc>
              <Price>₹{p.price}</Price>
              <Button onClick={() => addToCart(p)}>Add to Cart</Button>
            </Card>
          ))}
        </ProductGrid>
      </Content>
    </Page>
  );
}
