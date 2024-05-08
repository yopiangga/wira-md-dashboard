import { useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { InputDefault } from "src/components/input/input-default";
import { InputImage } from "src/components/input/input-image";
import { InputTextarea } from "src/components/input/input-textarea";
import { PatientServices } from "src/services/PatientServices";

export function PatientAddPage() {
  const navigate = useNavigate();
  const patientServices = new PatientServices();

  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await patientServices.createPatient({ ...formData });

    if (res) {
      toast.success("Patient created successfully");
      navigate("/patient");
    }
  };

  return (
    <div className="col-span-12">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
            <h4 className="f-h4 text-center">Add Patient</h4>
            <br />
            <div className="mt-0">
              <InputDefault
                label="NIK"
                name="nik"
                value={formData.nik}
                handleChange={handleChange}
                placeholder="NIK"
                type="text"
                required={true}
              />
            </div>
            <div className="mt-2">
              <InputDefault
                label="Name"
                name="name"
                value={formData.name}
                handleChange={handleChange}
                placeholder="Patient name"
                type="text"
                required={true}
              />
            </div>
            <div className="mt-2">
              <InputTextarea
                label="Address"
                name="address"
                value={formData.address}
                handleChange={handleChange}
                placeholder="Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Kec. Gubeng, Kota SBY, Jawa Timur 60286"
                type="text"
                required={true}
                rows={2}
              />
            </div>

            <div className="mt-2">
              <InputDefault
                label="No Telephone"
                name="phone"
                value={formData.phone}
                handleChange={handleChange}
                placeholder="831 5501078"
                type="number"
                required={true}
              />
            </div>
            <div className="mt-2 flex gap-4">
              <div>
                <InputDefault
                  label="Latitude"
                  name="latitude"
                  value={formData.latitude}
                  handleChange={handleChange}
                  placeholder=""
                  required={true}
                />
              </div>
              <div>
                <InputDefault
                  label="Longitude"
                  name="longitude"
                  value={formData.longitude}
                  handleChange={handleChange}
                  placeholder=""
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
            <div className="mt-2">
              <InputImage
                label="Patient Image"
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
                  navigate("/patient");
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
