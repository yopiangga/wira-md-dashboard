import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { InputDefault } from "src/components/input/input-default";
import { InputImage } from "src/components/input/input-image";
import { InputSelect } from "src/components/input/input-select";
import { InputTextarea } from "src/components/input/input-textarea";
import { HospitalServices } from "src/services/HospitalServices";
import { UsersServices } from "src/services/UsersServices";

export function UserAddPage() {
  const navigate = useNavigate();
  const usersServices = new UsersServices();
  const hospitalServices = new HospitalServices();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    idHospital: null,
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    const res = await hospitalServices.getHospitals();

    if (res) {
      setFormData({ ...formData, idHospital: res.data[0].id });
      setHospitals(res.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await usersServices.createUser({ ...formData });
    if (res) {
      toast.success("User added successfully");
      navigate("/user");
    }
  };

  return (
    <div className="col-span-12">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
            <h4 className="f-h4 text-center">Add User</h4>
            <br />
            <div className="mt-0">
              <InputDefault
                label="Name"
                name="name"
                value={formData.name}
                handleChange={handleChange}
                placeholder="Full name"
                type="text"
                required={true}
              />
            </div>
            <div className="mt-2">
              <InputDefault
                label="Email"
                name="email"
                value={formData.email}
                handleChange={handleChange}
                placeholder="example@email.com"
                type="email"
                required={true}
              />
            </div>
            <div className="mt-2">
              <InputDefault
                label="Password"
                name="password"
                value={formData.password}
                handleChange={handleChange}
                placeholder="********"
                type="password"
                required={true}
              />
            </div>
            <div className="mt-2">
              <InputSelect
                label="Hospital"
                name="idHospital"
                value={formData.idHospital}
                handleChange={handleChange}
                placeholder="Select Hospital"
                type="text"
                required={true}
                options={hospitals.map((hospital) => ({
                  value: hospital.id,
                  label: hospital.name,
                }))}
              />
            </div>
            <div className="mt-2">
              <InputSelect
                label="Role"
                name="role"
                value={formData.role}
                handleChange={handleChange}
                placeholder="Select Role"
                type="text"
                required={true}
                options={[
                  { value: "doctor", label: "Doctor" },
                  { value: "operator", label: "Operator" },
                ]}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
            <div className="mt-2">
              <InputImage
                label="Image"
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
                  navigate("/user");
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
