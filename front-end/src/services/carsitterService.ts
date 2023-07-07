import axios from "axios";
import { ICarsitter } from "../interfaces/carsitter";

const API_URL = "http://localhost:3000/api/carsitter";

export const getCarsitters = async (): Promise<ICarsitter[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/Carsitters`);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
};

export const getCarsitter = async (id: number): Promise<ICarsitter> => {
  try {
    const { data } = await axios.get(`${API_URL}/Carsitter/${id}`);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}

export const addCarsitter = async (Carsitter: ICarsitter): Promise<ICarsitter> => {
  try {
    const { data } = await axios.post(`${API_URL}/Carsitter`, Carsitter);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}

export const updateCarsitter = async (Carsitter: ICarsitter): Promise<ICarsitter> => {
  try {
    const { data } = await axios.put(`${API_URL}/Carsitter/${Carsitter.id}`, Carsitter);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}

export const deleteCarsitter = async (id: number): Promise<ICarsitter> => {
  try {
    const { data } = await axios.delete(`${API_URL}/Carsitter/${id}`);
    return data;
  } catch (error) {
    throw new Error(`An error has occurred: ${error}`);
  }
}


