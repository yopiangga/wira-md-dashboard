import { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { InputDefault } from "src/components/input/input-default";
import { InputImage } from "src/components/input/input-image";
import { InputSelect } from "src/components/input/input-select";
import { UsersServices } from "src/services/UsersServices";

export function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const usersServices = new UsersServices();

  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    const res = await usersServices.getUserById({ id });

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

    const res = await usersServices.updateUserImage({
      id,
      image: e.target.files[0],
    });
    if (res) {
      toast.success("User image updated successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await usersServices.updateUser({ ...formData });
    if (res) {
      toast.success("User updated successfully");
      navigate("/user");
    }
  };

  return (
    <div className="col-span-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
          <form onSubmit={handleSubmit}>
            <h4 className="f-h4 text-center">Edit User</h4>
            <br />
            <div className="mt-0">
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
              <InputSelect
                label="Role"
                name="role"
                value={formData.role}
                handleChange={handleChange}
                placeholder="Select Role"
                type="text"
                required={true}
                options={[
                  { value: "operator", label: "Operator" },
                  { value: "doctor", label: "Doctor" },
                ]}
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
          </form>
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
        </div>
      </div>
    </div>
  );
}
