export const Hero = () => {
  const handleScrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gray-900 h-[500px]">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&auto=format&fit=crop"
          alt="Pizza background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Las Mejores Pizzas Artesanales
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Descubre el auténtico sabor de la pizza italiana, preparada con ingredientes frescos
          y horneada en nuestro horno de leña tradicional.
        </p>
        <div className="mt-10">
          <button
            onClick={handleScrollToMenu}
            className="inline-flex items-center px-6 py-3 cursor-pointer border border-transparent text-base font-medium rounded-full text-black bg-white hover:bg-gray-100 transition"
          >
            Ver Menú
          </button>
        </div>
      </div>
    </div>
  );
};