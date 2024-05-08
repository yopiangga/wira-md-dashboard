import axios from "axios";
import { baseUrl, baseUrlFlask } from "src/config/Url";
import { handleAxiosError, handleOtherStatusCodes } from "./errors";
import { headers, headersFormData } from "./config";

export class MedicalRecordServices {
  async getMedicalRecords() {
    try {
      const response = await axios.get(`${baseUrl}/medical-records`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async getMedicalRecord(id) {
    try {
      const response = await axios.get(`${baseUrl}/medical-records/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async createMedicalRecord({ idPatient, image, description }) {
    const formData = new FormData();
    formData.append("idPatient", idPatient);
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await axios.post(
        `${baseUrl}/medical-records`,
        formData,
        {
          headers: headersFormData,
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  // async classificationMedicalRecord({ image }) {
  //   const formData = new FormData();
  //   formData.append("file", image);

  //   try {
  //     const response = await axios.post(
  //       `${baseUrlFlask}/prediction`,
  //       formData,
  //       {
  //         headers: headersFormData,
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     handleAxiosError(error);
  //     handleOtherStatusCodes(error);
  //   }
  // }

  async updateMedicalRecord({
    id,
    image,
    description,
  }) {
    const data = new FormData();
    data.append("id", id);
    data.append("image", image);
    data.append("description", description);

    try {
      const response = await axios.put(
        `${baseUrl}/medical-records`,
        data,
        {
          headers: headersFormData,
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }

  async deleteMedicalRecord(id) {
    try {
      const response = await axios.delete(`${baseUrl}/medical-records/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
      handleOtherStatusCodes(error);
    }
  }
}
