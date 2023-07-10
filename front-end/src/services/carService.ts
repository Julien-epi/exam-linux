import axios from "axios";
import { ICar } from "../interfaces/car";

const API_URL = "http://localhost:3000/api";

class CarService {
  getAllCars() {
    return axios.get<ICar[]>(API_URL + "/car/Allcars");
  }

  deleteCar(id: string) {
    return axios.delete<ICar[]>(API_URL + `/car/delete/${id}`);
  }

  getCarById(id: string) {
    return axios.get<ICar>(API_URL + `/car/findCarById/${id}`);
  }
  

  addCar(carData: ICar) {
    return axios.post<ICar>(API_URL + "/car/register", carData);
  }

  updateCar(id: string, modifyData: ICar) {
    return axios.put<ICar>(API_URL + `/car/update/${id}`, modifyData);
  }
}

export default new CarService();
