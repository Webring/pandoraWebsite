import axios from "axios";
import {baseApiUrl} from "./BaseApiUrl.js";

export default class TeachersService {
    static async getAll() {
        const response = await axios.get(`${baseApiUrl}/api/v1/teachers/`)
        return response.data;
    }

    static async getById(id) {
        console.log(baseApiUrl);
        const response = await axios.get(`${baseApiUrl}/api/v1/teachers/${id}/`)
        return response.data;
    }
}