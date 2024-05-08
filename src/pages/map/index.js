import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PatientServices } from "src/services/PatientServices";

export function MapPage() {
  const navigate = useNavigate();

  const patientServices = new PatientServices();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    const response = await patientServices.getPatients();
    setData(response.data);
  };

  return <div className="col-span-12"></div>;
}
