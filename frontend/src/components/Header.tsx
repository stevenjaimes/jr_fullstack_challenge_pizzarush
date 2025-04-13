import { ShoppingCart, Pizza } from 'lucide-react';
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

export const Header = () => {
  const { currentUser } = useAuth();
  const { toggleCart, totalItems } = useCartStore();
  

  const getInitials = (name?: string | null) => {
    if (!name) return 'US';
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const userInitials = getInitials(currentUser?.displayName);
  const userName = currentUser?.displayName || currentUser?.email?.split('@')[0];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Pizza className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">PizzaMia</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500">Inicio</Link>
            <Link to="#menu" className="text-gray-600 hover:text-orange-500">Menú</Link>
            <Link to="#" className="text-gray-600 hover:text-orange-500">Sobre Nosotros</Link>
            <Link to="#" className="text-gray-600 hover:text-orange-500">Contacto</Link>
          </nav>
          
          <div className="flex items-center space-x-6">
       
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
                className="text-sm text-gray-600 hover:text-orange-500 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};