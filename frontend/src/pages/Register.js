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

const Button = styled.button`
  width: 100%;
  background-color: #00cc66;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
`;

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirm)
      return alert('All fields are required');
    if (form.password !== form.confirm)
      return alert('Passwords do not match');

    fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        role: 'customer'
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) return alert(data.error);
      alert('Registered successfully');
      window.location.href = '/login';
    });
  };

  return (
    <Container>
      <h2>Register</h2>
      <Input name="firstName" placeholder="First Name" onChange={handleChange} />
      <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <Input name="email" placeholder="Email" onChange={handleChange} />
      <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <Input type="password" name="confirm" placeholder="Confirm Password" onChange={handleChange} />
      <Button onClick={submit}>Create Account</Button>
    </Container>
  );
}
