import { Bike, Clock } from 'lucide-react';

export const DeliverySection = () => {
  return (
    <section className="bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Entrega Express</h2>
          <p className="text-lg text-gray-600">Tu pizza favorita directo a tu puerta</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Bike className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
                <p className="text-gray-600">Nuestros repartidores expertos entregarán tu pedido en menos de 30 minutos.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Horario Extendido</h3>
                <p className="text-gray-600">Abierto todos los días de 11:00 AM a 11:00 PM para satisfacer tus antojos.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop"
              alt="Pizza delivery"
              className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-2xl font-bold text-orange-600">30 min</p>
              <p className="text-sm text-gray-600">Tiempo promedio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};