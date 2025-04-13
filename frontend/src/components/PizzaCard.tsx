import { Pizza } from '../types';
import { useCartStore } from '../store/cartStore';

type PizzaCardProps = {
  pizza: Pizza;
};

export const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const addToCart = useCartStore(state => state.addToCart);
  const toggleCart = useCartStore(state => state.toggleCart);

  const handleAddToCart = () => {
    addToCart(pizza);
    toggleCart(); 
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
      {/* Imagen de la pizza */}
      <div className="h-48 overflow-hidden">
        <img 
          src={pizza.imageUrl} 
          alt={pizza.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Pizza+Image';
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{pizza.name}</h3>
          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            "pereroni"
          </span>
        </div>
        
  
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pizza.description}
        </p>
        
    
        <div className="flex flex-wrap gap-2 mb-4">
          {pizza.ingredients.map((ingredient, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {ingredient}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${pizza.price}
          </span>
          <button 
            onClick={handleAddToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition font-medium flex items-center space-x-1"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};