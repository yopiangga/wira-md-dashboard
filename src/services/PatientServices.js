import axios from "axios";
import { baseUrl } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import { headers, headersFormData } from "./config";

export class PatientServices {
  async getPatients() {
    try {
      const response = await axios.get(`${baseUrl}/patients`, { headers });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async getPatient(id) {
    try {
      const response = await axios.get(`${baseUrl}/patients/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async createPatient({
    name,
    address,
    phone,
    image,
    nik,
    latitude,
    longitude,
  }) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("image", image);
    formData.append("nik", nik);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    try {
      const response = await axios.post(`${baseUrl}/patients`, formData, {
        headers: headersFormData,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async updatePatient({ id, name, address, phone, nik, latitude, longitude }) {
    try {
      const response = await axios.put(
        `${baseUrl}/patients/${id}`,
        {
          name,
          address,
          phone,
          nik,
          latitude,
          longitude,
        },
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async updatePatientImage({ id, image }) {
    const data = new FormData();
    data.append("image", image);

    try {
      const response = await axios.put(
        `${baseUrl}/patients/${id}/image`,
        data,
        {
          headersFormData,
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async deletePatient(id) {
    try {
      const response = await axios.delete(`${baseUrl}/patients/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }
}
