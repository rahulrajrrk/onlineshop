import React, { useState } from 'react';
import styled from 'styled-components';
import { API_BASE } from '../config';

const Container = styled.div`
  max-width: 600px;
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
const Select = styled.select`
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

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '', price: '', weight: '', description: '', category: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (!form.name || !form.price || !form.weight || !form.description || !form.category || !image)
      return alert('Please fill all fields and upload an image');

    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    formData.append('image', image);

    fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        window.location.href = '/admin/products';
      });
  };

  return (
    <Container>
      <h2>Add New Product</h2>
      <Input name="name" placeholder="Product Name" onChange={handleChange} />
      <Input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <Input name="weight" placeholder="Weight (e.g., 1kg, 500gm)" onChange={handleChange} />
      <Input name="description" placeholder="Description" onChange={handleChange} />
      <Select name="category" onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="fruits">Fruits</option>
        <option value="vegetables">Vegetables</option>
      </Select>
      <Input type="file" onChange={e => setImage(e.target.files[0])} />
      <Button onClick={submit}>Add Product</Button>
    </Container>
  );
}
