import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #00cc66;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Toggle = styled.button`
  background-color: ${({ dark }) => (dark ? '#555' : '#ccc')};
  color: ${({ dark }) => (dark ? '#fff' : '#333')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  background-color: #00cc66;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #00994d;
  }
`;

export default function CustomerProfile() {
  const [name, setName] = useState('Rahul');
  const [email] = useState('rahul@example.com'); // read-only mock
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode(prev => !prev);
    document.body.style.backgroundColor = darkMode ? '#fff' : '#121212';
    document.body.style.color = darkMode ? '#000' : '#fff';
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleUpdate = () => {
    alert('Profile updated (mock)');
  };

  return (
    <Container>
      <Title>Your Profile</Title>

      <Label>Name</Label>
      <Input value={name} onChange={e => setName(e.target.value)} />

      <Label>Email</Label>
      <Input value={email} readOnly />

      <Toggle dark={darkMode} onClick={handleToggleTheme}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </Toggle>

      <Button onClick={handleUpdate}>Update Profile</Button>
      <Button onClick={handleLogout} style={{ marginTop: '1rem', backgroundColor: '#dc3545' }}>
        Logout
      </Button>
    </Container>
  );
}
