import { PizzaService } from "../services/PizzaService";
import { mockPizzaRepository } from "@/tests/__mocks__/repositories/PizzaRepository";
import { Pizza } from "@/models/Pizza";

// Datos de prueba
const mockPizza: Pizza = {
  id: "1",
  name: "Margherita",
  price: 10,
  ingredients: ["tomato", "mozzarella"]
};

describe("PizzaService", () => {
  let pizzaService: PizzaService;

  beforeEach(() => {
    // Resetear mocks antes de cada test
    jest.clearAllMocks();
    pizzaService = new PizzaService(mockPizzaRepository);
  });

  // ----------------------------
  // TEST: getAll()
  // ----------------------------
  describe("getAll", () => {
    it("debería retornar un array de pizzas", async () => {
      // Configurar mock
      mockPizzaRepository.getAll.mockResolvedValue([mockPizza]);

      // Ejecutar
      const result = await pizzaService.getAll();

      // Verificar
      expect(result).toEqual([mockPizza]);
      expect(mockPizzaRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

  // ----------------------------
  // TEST: getById()
  // ----------------------------
  describe("getById", () => {
    it("debería retornar una pizza si existe", async () => {
      mockPizzaRepository.getById.mockResolvedValue(mockPizza);

      const result = await pizzaService.getById("1");

      expect(result).toEqual(mockPizza);
      expect(mockPizzaRepository.getById).toHaveBeenCalledWith("1");
    });

    it("debería retornar undefined si no existe", async () => {
      mockPizzaRepository.getById.mockResolvedValue(undefined);

      const result = await pizzaService.getById("99");

      expect(result).toBeUndefined();
    });
  });

  // ----------------------------
  // TEST: createPizza()
  // ----------------------------
  describe("createPizza", () => {
    const newPizzaData = {
      name: "Pepperoni",
      price: 12,
      ingredients: ["pepperoni"]
    };

    it("debería crear una pizza si el nombre no existe", async () => {
      // Configurar mocks
      mockPizzaRepository.existsByName.mockResolvedValue(false);
      mockPizzaRepository.create.mockResolvedValue({
        id: "2",
        ...newPizzaData
      });

      // Ejecutar
      const result = await pizzaService.createPizza(newPizzaData);

      // Verificar
      expect(result).toEqual({
        id: "2",
        ...newPizzaData
      });
      expect(mockPizzaRepository.existsByName).toHaveBeenCalledWith("Pepperoni");
      expect(mockPizzaRepository.create).toHaveBeenCalledWith(newPizzaData);
    });

    it("debería lanzar error si el nombre ya existe", async () => {
      mockPizzaRepository.existsByName.mockResolvedValue(true);

      await expect(pizzaService.createPizza(newPizzaData)).rejects.toThrow(
        "Pizza name already exists"
      );
    });
  });
});