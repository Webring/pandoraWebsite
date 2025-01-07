import axios from "axios";
import {baseApiUrl} from "./BaseApiUrl.js";

export default class DirectionsService {
    static async getAll() {
        const response = await axios.get(`${baseApiUrl}/api/v1/directions/`)
        return response.data;
    }

    static async getById(id) {
        console.log(baseApiUrl);
        const response = await axios.get(`${baseApiUrl}/api/v1/directions/${id}/`)
        return response.data;
    }
}