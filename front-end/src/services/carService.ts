import axios from "axios";
import { ICar } from "../interfaces/car";

const API_URL = "http://localhost:3000/api/car";

export const getCars = async (): Promise<ICar[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/cars`);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
};

export const getCar = async (id: number): Promise<ICar> => {
  try {
    const { data } = await axios.get(`${API_URL}/car/${id}`);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}

export const addCar = async (car: ICar): Promise<ICar> => {
  try {
    const { data } = await axios.post(`${API_URL}/car`, car);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}

export const updateCar = async (car: ICar): Promise<ICar> => {
  try {
    const { data } = await axios.put(`${API_URL}/car/${car.id}`, car);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}

export const deleteCar = async (id: number): Promise<ICar> => {
  try {
    const { data } = await axios.delete(`${API_URL}/car/${id}`);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}


