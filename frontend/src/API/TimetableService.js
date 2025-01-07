import axios from "axios";
import {baseApiUrl} from "./BaseApiUrl.js";

export default class TimetableService {
    static async getSchedule() {
        const response = await axios.get(`${baseApiUrl}/api/v1/schedule/`)
        return response.data;
    }
    static async getAnnouncment() {
        const response = await axios.get(`${baseApiUrl}/api/v1/schedule-announcement/`)
        return response.data;
    }
}