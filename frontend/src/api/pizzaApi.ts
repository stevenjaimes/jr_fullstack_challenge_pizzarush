import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/pizzas',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPizzas = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getPizzaById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};