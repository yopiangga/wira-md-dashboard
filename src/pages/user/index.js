import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ActionIndex } from "src/components/action-index";
import { TableComponent } from "src/components/table";
import { UsersServices } from "src/services/UsersServices";

export function UserPage() {
  const navigate = useNavigate();
  const usersServices = new UsersServices();

  const [data, setData] = useState([]);

  const headerTable = [
    { code: "id", name: "ID" },
    { code: "image", name: "Image", type: "image" },
    { code: "name", name: "Name" },
    { code: "email", name: "Email" },
    { code: "role", name: "Role" },
    { code: "hospital", name: "Hospital" },
    { code: "action", name: "Action" },
  ];

  useEffect(() => {
    fetch();
  }, []);

  async function fetch(offset) {
    const res = await usersServices.getUsers();

    if (res) setData(res.data);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="col-span-12">
      <ActionIndex
        handleSearch={handleSearch}
        labelButton="Add User"
        routeActionButton={"/user/add"}
      />

      <br />

      <TableComponent
        header={headerTable}
        action={[
          {
            color: "info",
            name: "Edit",
            callback: (id) => {
              navigate("/user/edit/" + id);
            },
          },
          {
            color: "error",
            name: "Delete",
            callback: async (id) => {
              const res = await usersServices.deleteUser({ id });

              if (res) {
                toast.success("User deleted successfully");
                fetch();
              }
            },
          },
        ]}
        data={data || []}
      />

      <br />
    </div>
  );
}
