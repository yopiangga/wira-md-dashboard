import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputDefault } from "src/components/input/input-default";
import { Button } from "react-daisyui";
import { UserServices } from "src/services/UserServices";
import toast from "react-hot-toast";

export function MyProfileEditPage() {
  const navigate = useNavigate();
  const userServices = new UserServices();

  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    const res = await userServices.myProfile();

    if (res) {
      setFormData(res.data);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await userServices.updateProfile({ ...formData });

    if (res) {
      toast.success("Success edit profile");
      navigate("/me");
    }
  }

  return (
    <div className="col-span-12">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 bg-white shadow-lg py-8 px-6 rounded-lg h-fit">
            <h4 className="f-h4 text-center">Edit Profile</h4>
            <br />
            <div className="mt-0">
              <InputDefault
                color="dark"
                label={"Nama"}
                name={"name"}
                value={formData.name}
                handleChange={handleChange}
                type={"text"}
                required={true}
                placeholder={"Nama admin"}
              />
            </div>

            <div className="mt-4 flex gap-4">
              <Button
                className="grow"
                color="neutral"
                onClick={() => {
                  navigate("/me");
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
