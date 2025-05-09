import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #00cc66;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  background-color: #00cc66;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  color: white;
  background-color: ${props => props.edit ? '#007bff' : '#dc3545'};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with real API later
    setProducts([
      {
        name: 'Tomato',
        weight: '1kg',
        price: 25,
        category: 'vegetables',
        image: 'https://via.placeholder.com/100',
      },
      {
        name: 'Mango',
        weight: '500gm',
        price: 80,
        category: 'fruits',
        image: 'https://via.placeholder.com/100',
      }
    ]);
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure to delete this product?")) {
      const newList = [...products];
      newList.splice(index, 1);
      setProducts(newList);
    }
  };

  return (
    <Container>
      <Title>All Products</Title>
      <Table>
        <thead>
          <tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Weight</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <Td><Img src={p.image} alt={p.name} /></Td>
              <Td>{p.name}</Td>
              <Td>{p.weight}</Td>
              <Td>₹{p.price}</Td>
              <Td>{p.category}</Td>
              <Td>
                <Button edit onClick={() => alert('Edit feature coming soon')}>Edit</Button>
                <Button onClick={() => handleDelete(index)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
