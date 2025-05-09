import React, { useState } from 'react';
import styled from 'styled-components';
import { API_BASE } from '../config';

const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  font-family: Arial;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Link = styled.p`
  font-size: 0.85rem;
  color: #555;
  text-align: right;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  background-color: #00cc66;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!email || !password) return alert('Email and password are required');

    fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      localStorage.setItem('email', email);
      localStorage.setItem('role', data.role);
      window.location.href = data.role === 'admin' ? '/admin' : '/customer';
    });
  };

  return (
    <Container>
      <h2>Login</h2>
      <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <Link onClick={() => alert('Forgot Password feature coming soon.')}>Forgot Password?</Link>
      <Link onClick={() => window.location.href = '/register'}>Don't have an account? Register now</Link>
      <Button onClick={submit}>Login</Button>
    </Container>
  );
}
