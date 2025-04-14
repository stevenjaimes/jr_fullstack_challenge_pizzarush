// src/App.tsx
import './App.css';
import { Login } from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import Home from './components/Home';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { CartSidebar } from './components/CartSidebar';
import { Toaster } from 'sonner';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrdenConfirmation'; // Añade esta importación
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Route>

          </Routes>
          <Footer />
          <CartSidebar />
        </AuthProvider>
        <Toaster position="top-center" richColors />
      </Router>
    </>
  );
}

export default App;