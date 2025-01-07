import axios from "axios";
import {baseApiUrl} from "./BaseApiUrl.js";

export default class SocialsService {
    static async getAll() {
        const response = await axios.get(`${baseApiUrl}/api/v1/socials/`)
        return response.data;
    }
}