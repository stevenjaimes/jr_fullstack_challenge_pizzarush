import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export const Checkout = () => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCartStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    if (!currentUser) {
      toast.error('Debes iniciar sesión para realizar un pedido');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    
    try {

      const orderData = {
        userId: currentUser.uid,
        items: cartItems.map(item => ({
          pizzaId: item.id,
          quantity: item.quantity,
          price: item.price, 
          name: item.name   
        })),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser.getIdToken()}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Error al crear la orden');


      clearCart();
      toast.success('¡Pedido realizado con éxito!');
      navigate('/order-confirmation');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al procesar tu pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resumen de tu pedido</h2>
        
        <div className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <div key={item.id} className="py-4 flex justify-between">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} c/u</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total ({totalItems()} {totalItems() === 1 ? 'producto' : 'productos'})</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Información de envío</h2>
        
        {currentUser ? (
          <div className="space-y-4">
            <div>
              <p className="font-medium">Nombre: {currentUser.displayName || 'No especificado'}</p>
              <p className="text-gray-600">Email: {currentUser.email}</p>
            </div>
            

            <div className="mt-6">
              <Button 
                onClick={handleSubmitOrder}
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Finalizar Pedido'
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Debes iniciar sesión para finalizar tu compra</p>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Iniciar sesión
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};