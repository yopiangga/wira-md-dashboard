import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { InputSelect } from "src/components/input/input-select";
import { InputTextarea } from "src/components/input/input-textarea";
import { MedicalRecordServices } from "src/services/MedicalRecordServices";
import { PatientServices } from "src/services/PatientServices";
import { InputDicom } from "src/components/input/input-dicom";
import LoadComponent from "src/components/load";

export function MedicalRecordAddPage() {
  const navigate = useNavigate();
  const medicalRecordServices = new MedicalRecordServices();
  const patientServices = new PatientServices();

  const [formData, setFormData] = useState({
    idPatient: null,
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [patients, setPatients] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetchPatient();
    }, 0);
  }, []);

  async function fetchPatient() {
    const res = await patientServices.getPatients();

    if (res) {
      setFormData({ ...formData, idPatient: res.data[0].id });
      setPatients(res.data);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    const res = await medicalRecordServices.createMedicalRecord({
      ...formData,
    });

    setLoad(false);

    if (res) {
      toast.success("Medical Record created successfully");
      navigate("/medical-record");
    }
  };

  if (!patients || load) {
    return (
      <div className="col-span-12">
        <LoadComponent />
      </div>
    );
  }

  return (
    <div className="col-span-12">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
            <h4 className="f-h4 text-center">Add Medical Record</h4>
            <br />
            <div className="mt-0">
              <InputSelect
                label="Patient"
                name="idPatient"
                value={formData?.idPatient}
                handleChange={handleChange}
                placeholder="Patient"
                required={true}
                options={
                  patients &&
                  patients.map((patient) => ({
                    value: patient.id,
                    label: patient.id + " - " + patient.name,
                  }))
                }
              />
            </div>
            <div className="mt-2">
              <InputTextarea
                label="Description"
                name="description"
                value={formData.description}
                handleChange={handleChange}
                placeholder="Description"
                type="text"
                required={true}
                rows={3}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
            <div className="mt-2">
              <InputDicom
                label="Medical Image"
                name="image"
                value={formData.image}
                preview={preview}
                handleChange={handleFileChange}
                required={true}
              />
            </div>

            <div className="mt-4 flex gap-4">
              <Button
                className="grow"
                color="neutral"
                onClick={() => {
                  navigate("/medical-record");
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button
                className="bg-primary-main grow text-white"
                color="neutral"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
