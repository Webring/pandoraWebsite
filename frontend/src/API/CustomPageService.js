import axios from "axios";
import {baseApiUrl} from "./BaseApiUrl.js";

export default class CustomPageService {
    static async getAll() {
        const response = await axios.get(`${baseApiUrl}/api/v1/pages/`)
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`${baseApiUrl}/api/v1/pages/${id}/`)
        return response.data;
    }
}