import axios from "axios";
import {baseApiUrl} from "./BaseApiUrl.js";

export default class PriceService {
    static async getAll() {
        const response = await axios.get(`${baseApiUrl}/api/v1/pricelist/`)
        return response.data;
    }

}