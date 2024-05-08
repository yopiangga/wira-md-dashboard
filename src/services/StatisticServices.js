import axios from "axios";
import { baseUrl } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import { headers } from "./config";

export class StatisticServices {
    async getStatisticByOperator({idHospital}) {
        try {
            const response = await axios.get(`${baseUrl}/statistics/by-operator/${idHospital}`, { headers });
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            handleOtherStatusCodes(error);
        }
    }

    async getStatisticByAdmin() {
        try {
            const response = await axios.get(`${baseUrl}/statistics/by-admin`, { headers });
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            handleOtherStatusCodes(error);
        }
    }
}
