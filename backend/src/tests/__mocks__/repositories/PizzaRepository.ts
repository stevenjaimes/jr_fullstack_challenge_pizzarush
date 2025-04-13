// Mock manual para IPizzaRepository
import { IPizzaRepository } from "../../../repositories/interfaces/IPizzaRepository";

export const mockPizzaRepository: jest.Mocked<IPizzaRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    existsByName: jest.fn(),
    create: jest.fn(),
  };