import { PizzaService } from "../../services/PizzaService";
import { mockPizzaRepository } from "@/tests/__mocks__/repositories/PizzaRepository";
import { Pizza } from "@/models/Pizza";


const mockPizza: Pizza = {
  id: "1",
  name: "Margherita",
  price: 10,
  imageUrl: "https://example.com/margherita.jpg",
  description: "Pizza de tomate y mozzarella",
  ingredients: ["tomato", "mozzarella"]
};

describe("PizzaService", () => {
  let pizzaService: PizzaService;

  beforeEach(() => {

    jest.clearAllMocks();
    pizzaService = new PizzaService(mockPizzaRepository);
  });

 
  describe("getAll", () => {
    it("debería retornar un array de pizzas", async () => {

      mockPizzaRepository.getAll.mockResolvedValue([mockPizza]);

      const result = await pizzaService.getAll();

      expect(result).toEqual([mockPizza]);
      expect(mockPizzaRepository.getAll).toHaveBeenCalledTimes(1);
    });
  });

 
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

  describe("createPizza", () => {
    const newPizzaData = {
      name: "Pepperoni",
      price: 12,
      ingredients: ["pepperoni"],
      imageUrl: "https://example.com/pepperoni.jpg",
      description: "Pizza de pepperoni"
    };

    it("debería crear una pizza si el nombre no existe", async () => {

      mockPizzaRepository.existsByName.mockResolvedValue(false);
      mockPizzaRepository.create.mockResolvedValue({
        id: "2",
        ...newPizzaData
      });

      const result = await pizzaService.createPizza(newPizzaData);

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