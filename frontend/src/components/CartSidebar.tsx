import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CartSidebar = () => {
  const {
    isCartOpen,
    cartItems,
    toggleCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart
  } = useCartStore();

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      toast.warning('Debes iniciar sesión para finalizar tu compra', {
        description: 'Serás redirigido al login',
        action: {
          label: 'Entendido',
          onClick: () => {}
        },
        duration: 3000
      });
      
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/login');
      toggleCart();
      return;
    }
    
    navigate('/checkout');
    toggleCart();
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isCartOpen ? 'block' : 'hidden'}`}>
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={toggleCart}
      />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Carrito de compras
                </h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={toggleCart}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Tu carrito está vacío</p>
                    <Button 
                      onClick={toggleCart}
                      className="mt-4 bg-orange-500 hover:bg-orange-600"
                    >
                      Seguir comprando
                    </Button>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Pizza';
                              }}
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.name || 'Pizza'}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </Button>
                                <Input 
                                  type="number" 
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                                  className="w-16 text-center"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${totalPrice().toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  {totalItems()} {totalItems() === 1 ? 'producto' : 'productos'}
                </p>
                <div className="mt-6 space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Finalizar compra
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearCart}
                  >
                    Vaciar carrito
                  </Button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    o{' '}
                    <button
                      type="button"
                      className="font-medium text-orange-600 hover:text-orange-500"
                      onClick={toggleCart}
                    >
                      Continuar comprando
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};