import express from 'express';
import cors from 'cors';
import pizzaRoutes from './routes/pizza.routes';
import orderRoutes from './routes/order.routes';
import adminRoutes from './routes/userRoutes';

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],  
}));

app.use(express.json());

app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', adminRoutes);

const PORT = process.env.PORT || 3000;

export const server = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}