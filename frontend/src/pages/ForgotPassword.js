import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f5f9;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: #00cc66;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: #00cc66;
  color: white;
  padding: 0.75rem;
  margin-top: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #00994d;
  }
`;

const LinkText = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

const Link = styled.span`
  color: #00cc66;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #007744;
  }
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Password reset instructions sent to your email.');
    navigate('/login');
  };

  return (
    <Container>
      <Card>
        <Title>Forgot Password</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Send Reset Link</Button>
        </form>
        <LinkText>
          Back to <Link onClick={() => navigate('/login')}>Login</Link>
        </LinkText>
      </Card>
    </Container>
  );
}
