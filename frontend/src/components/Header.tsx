import { ShoppingCart, Pizza, Menu, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../firebase/auth';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';

export const Header = () => {
  const { currentUser } = useAuth();
  const { toggleCart, totalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name?: string | null) => {
    if (!name) return 'US';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const userInitials = getInitials(currentUser?.displayName);
  const userName = currentUser?.displayName || currentUser?.email?.split('@')[0];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menú hamburguesa (solo móvil) */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-orange-500 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo - centrado en móvil */}
          <div className="flex items-center md:ml-0 mx-auto md:mx-0">
            <Pizza className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">PizzaRush</span>
          </div>
          
          {/* Menú de navegación (escritorio) */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500">Inicio</Link>
            <Link to="#menu" className="text-gray-600 hover:text-orange-500">Menú</Link>
            <Link to="#" className="text-gray-600 hover:text-orange-500">Sobre Nosotros</Link>
            <Link to="#" className="text-gray-600 hover:text-orange-500">Contacto</Link>
          </nav>
          
          {/* Iconos de carrito y usuario */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button 
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-orange-500 transition-colors" />
              
              {totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform hover:scale-110 transition-transform">
                  {totalItems() > 9 ? '9+' : totalItems()}
                </span>
              )}
            </button>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center cursor-pointer group">
                    <Avatar className="h-8 w-8 border border-orange-100 group-hover:border-orange-200 transition-colors">
                      <AvatarImage 
                        src={currentUser.photoURL || undefined} 
                        alt={userName}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-orange-500 text-white font-medium">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-40 bg-white/95 backdrop-blur-sm rounded-md shadow-lg border border-gray-100 py-1"
                  align="end" 
                  forceMount
                >
                  <div className="px-2 py-1.5 text-xs text-gray-500 border-b border-gray-100">
                    {userName}
                  </div>
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/dashboard" 
                      className="w-full cursor-pointer px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors flex items-center"
                    >
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={logout}
                    className="px-2 py-1.5 cursor-pointer text-sm text-red-600 hover:bg-red-50/80 transition-colors flex items-center"
                  >
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-orange-500 transition-colors p-2"
                aria-label="Iniciar sesión"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Menú móvil (dropdown) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-lg rounded-b-lg border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="#menu" 
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menú
              </Link>
              <Link 
                to="#" 
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link 
                to="#" 
                className="text-gray-600 hover:text-orange-500 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};