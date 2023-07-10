import axios from "axios";
import { ICarsitter } from "../interfaces/carsitter";

const API_URL = "http://localhost:3000/api";

class CarsitterService {
  getAllCarsitters() {
    return axios.get<ICarsitter[]>(API_URL + "/carSistters/AllCarSistters");
  }

  deleteCarsitter(id: string) {
    return axios.delete(API_URL + `/carSistters/delete/${id}`);
  }

  getCarsitterById(id: string) {
    return axios.get<ICarsitter>(API_URL + `/carSistters/findCarSitterById/${id}`);
  }
  
  getCarsittersByIds(ids: string[]) {
    return axios.post<ICarsitter[]>(API_URL + "/carSistters/findCarsittersByIds", { ids });
  }

  addCarsitter(carsitterData: ICarsitter) {
    return axios.post<ICarsitter>(API_URL + "/carSistters/register", carsitterData);
  }

  updateCarsitter(id: string, modifyData: ICarsitter) {
    return axios.put<ICarsitter>(API_URL + `/carSistters/update/${id}`, modifyData);
  }
}

export default new CarsitterService();
