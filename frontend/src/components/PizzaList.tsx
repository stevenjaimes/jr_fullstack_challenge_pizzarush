
import { useQuery } from '@tanstack/react-query';
import { getPizzas } from '../api/pizzaApi';
import { PizzaCard } from './PizzaCard';
import { Pizza } from '../types';


export const PizzaList = () => {
    const { data: pizzas, isLoading, error } = useQuery({
      queryKey: ['pizzas'],
      queryFn: getPizzas,
    });
  
    if (isLoading) return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
    
    if (error) return (
      <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg mx-4">
        Error al cargar las pizzas. Por favor, intente nuevamente.
      </div>
    );
  
    return (
      <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Nuestras Pizzas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas?.map((pizza: Pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </section>
    );
  };