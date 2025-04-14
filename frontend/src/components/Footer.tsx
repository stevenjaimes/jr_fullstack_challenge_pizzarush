import { Facebook, Instagram, Pizza, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <Pizza className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold">PizzaRush</span>
            </div>
            <p className="text-gray-400">
              Disfruta de las mejores pizzas artesanales en Cúcuta. Tradición italiana, sabor local.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Menú</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Pizzas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Bebidas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Postres</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Promociones</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lunes - Jueves: 11:00 - 22:00</li>
              <li>Viernes - Sábado: 11:00 - 23:00</li>
              <li>Domingo: 12:00 - 22:00</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PizzaRush. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};