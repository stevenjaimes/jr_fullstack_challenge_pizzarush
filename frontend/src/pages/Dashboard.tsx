
  import { useAuth } from '../contexts/AuthContext';
  import { useEffect, useState } from 'react';
  import { Loader2, Pizza as PizzaIcon, Clock, CheckCircle, XCircle } from 'lucide-react';
  import { toast } from 'sonner';
  import axios from 'axios';



  const Dashboard = () => {
    
    const { currentUser, isAdmin } = useAuth();

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    console.log(isAdmin);

    const [pizzaData, setPizzaData] = useState({
      name: '',
      price: '',
      ingredients: '',
      imageUrl: '',
      description: '',
    });


    const fetchUserOrders = async () => {
      if (!currentUser?.uid) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/orders`, {
          params: { userId: currentUser.uid }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        toast.error('Error al cargar las órdenes');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (currentUser) {
        fetchUserOrders();

      } else {
        setLoading(false);
      }
    }, [currentUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPizzaData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleCreatePizza = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const newPizza = {
          ...pizzaData,
          price: parseFloat(pizzaData.price),
          ingredients: pizzaData.ingredients.split(',').map(ing => ing.trim()),
        };

        await axios.post('http://localhost:3000/api/pizzas', newPizza);
        
        toast.success('Pizza creada exitosamente');
        setPizzaData({
          name: '',
          price: '',
          ingredients: '',
          imageUrl: '',
          description: '',
        });
      } catch (error) {
        console.error('Error al crear la pizza:', error);
        // @ts-ignore
        toast.error(error.response?.data?.message || 'Error al crear la pizza');
      }
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
        </div>
      );
    }

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tus Órdenes 🍕</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No tienes órdenes registradas.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Orden #{order.id}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt._seconds * 1000).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <PizzaIcon className="w-4 h-4 text-orange-500" />
                      <span>{item.name} x{item.quantity}</span>
                      <span className="ml-auto font-medium">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="font-semibold">Total: ${order.total}</div>
                  <div className={`flex items-center gap-1 text-sm ${
                    order.status === 'pending' ? 'text-yellow-500' :
                    order.status === 'completed' ? 'text-green-600' :
                    'text-red-500'
                  }`}>
                    {order.status === 'pending' && <Clock className="w-4 h-4" />}
                    {order.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                    {order.status === 'cancelled' && <XCircle className="w-4 h-4" />}
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdmin && (
          <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Crear Nueva Pizza 🍕</h3>
              <form onSubmit={handleCreatePizza} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={pizzaData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={pizzaData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredientes (separados por comas)</label>
                  <input
                    type="text"
                    name="ingredients"
                    value={pizzaData.ingredients}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL de la imagen</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={pizzaData.imageUrl}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={pizzaData.description}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Crear Pizza
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Dashboard;