import { Pizza } from '../types';
import { useCartStore } from '../store/cartStore';
import { FaCartPlus, FaPlus } from 'react-icons/fa';

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full">
      {/* Imagen de la pizza con más espacio */}
      <div className="h-64 md:h-72 overflow-hidden relative">
        <img 
          src={pizza.imageUrl} 
          alt={pizza.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Pizza+Image';
          }}
        />
        {/* Botón flotante para añadir al carrito */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg flex items-center justify-center hover:scale-110"
          aria-label="Añadir al carrito"
        >
          <FaCartPlus className="text-xl" />
          <span className="sr-only">Añadir al carrito</span>
        </button>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{pizza.name}</h3>
          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            {pizza.category || "popular"}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
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
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-2xl font-bold text-gray-900">
            ${pizza.price.toFixed(2)}
          </span>
          {/* Versión alternativa del botón para móviles */}
          <button 
            onClick={handleAddToCart}
            className="md:hidden bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition font-medium flex items-center justify-center"
            aria-label="Añadir al carrito"
          >
            <FaPlus className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};