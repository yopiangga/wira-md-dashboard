import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { InputDefault } from "src/components/input/input-default";
import { InputImage } from "src/components/input/input-image";
import { InputTextarea } from "src/components/input/input-textarea";
import { HospitalServices } from "src/services/HospitalServices";

export function HospitalEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const hospitalServices = new HospitalServices();

  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    const res = await hospitalServices.getHospital(id);

    if (res) {
      setFormData(res.data);
      setPreview(res.data.image);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));

    const res = await hospitalServices.updateHospitalImage({
      id,
      image: e.target.files[0],
    });
    if (res) {
      toast.success("Hospital updated image successfully");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = hospitalServices.updateHospital({ ...formData });

    if (res) {
      toast.success("Hospital updated successfully");
      navigate("/hospital");
    }
  };

  return (
    <div className="col-span-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
          <form onSubmit={handleSubmit}>
            <h4 className="f-h4 text-center">Edit Hospital</h4>
            <br />
            <div className="mt-0">
              <InputDefault
                label="Name"
                name="name"
                value={formData.name}
                handleChange={handleChange}
                placeholder="Hospital name"
                type="text"
                required={true}
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

            <div className="mt-4 flex gap-4">
              <Button
                className="grow"
                color="neutral"
                onClick={() => {
                  navigate("/hospital");
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
          </form>
        </div>
        <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
          <div className="mt-2">
            <InputImage
              label="Hospital Image"
              name="image"
              value={formData.image}
              preview={preview}
              handleChange={handleFileChange}
              required={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
