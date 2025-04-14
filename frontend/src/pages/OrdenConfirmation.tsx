import { CheckCircle, Clock, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { clearCart } = useCartStore();


  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Gracias por tu compra, {currentUser?.displayName || 'cliente'}.
          </p>
          
          <div className="bg-green-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-green-800">Tiempo estimado de entrega</h2>
            </div>
            <p className="text-2xl font-bold text-green-600">30-45 minutos</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-orange-500 mb-8">
            <Pizza className="h-5 w-5" />
            <p className="text-sm font-medium">Tu pizza está siendo preparada con amor</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate('/dashboard/orders')}
              className="bg-green-600 hover:bg-green-700"
            >
              Ver mis pedidos
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};