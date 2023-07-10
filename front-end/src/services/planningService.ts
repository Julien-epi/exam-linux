import axios from "axios";
import { IPlanning } from "../interfaces/planning";

const API_URL = "http://localhost:3000/api";

class PlanningService {
  getAllSlots() {
    return axios.get<IPlanning[]>(API_URL + "/planning");
  }

  deleteSlot(id: string) {
    return axios.delete<IPlanning[]>(API_URL + `/planning/delete/${id}`);
  }

  getSlotById(id: string) {
    return axios.get<IPlanning>(API_URL + `/planning/${id}`);
  }

  createSlot(slotData: IPlanning) {
    return axios.post<IPlanning>(API_URL + "/planning/create", slotData);
  }

  updateSlot(id: string, modifyData: IPlanning) {
    return axios.put<IPlanning>(API_URL + `/planning/update/${id}`, modifyData);
  }
}

export default new PlanningService();
