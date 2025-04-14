import { MapPin, Phone } from 'lucide-react';

export const LocationSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Encuéntranos</h2>
          <p className="text-lg text-gray-600">Visítanos en nuestra ubicación en Cúcuta</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-900">Dirección</h3>
              </div>
              <p className="text-gray-600 mb-4">Av. Principal #123, Centro Comercial Plaza</p>
              <p className="text-gray-600">Cúcuta, Colombia</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-900">Contacto</h3>
              </div>
              <p className="text-gray-600 mb-2">Teléfono: +57 318 641 1411</p>
              <p className="text-gray-600">Email: info@pizzarush.com</p>
            </div>
          </div>
          
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63053.33098048247!2d-72.54201755!3d7.8939095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66459c645dd28b%3A0x26736c1ff4db5caa!2sC%C3%BAcuta%2C%20Norte%20de%20Santander!5e0!3m2!1ses!2sco!4v1710969844044!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de PizzaRush"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};