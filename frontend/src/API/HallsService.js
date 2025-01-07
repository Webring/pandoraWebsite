import axios from "axios";
import {baseApiUrl} from "./BaseApiUrl.js";

export default class HallsService {
    static async getAll() {
        const response = await axios.get(`${baseApiUrl}/api/v1/hall/`)
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`${baseApiUrl}/api/v1/hall/${id}/`)
        return response.data;
    }
}