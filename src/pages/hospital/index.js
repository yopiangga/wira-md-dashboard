import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ActionIndex } from "src/components/action-index";
import { TableComponent } from "src/components/table";
import { HospitalServices } from "src/services/HospitalServices";

export function HospitalPage() {
  const navigate = useNavigate();
  const hospitalServices = new HospitalServices();

  const [data, setData] = useState([]);

  const headerTable = [
    { code: "id", name: "ID" },
    { code: "name", name: "Name" },
    { code: "description", name: "Description" },
    { code: "address", name: "Address" },
    { code: "phone", name: "No Telephone" },
    { code: "image", name: "Image", type: "image" },
    { code: "action", name: "Action" },
  ];

  useEffect(() => {
    fetch();
  }, []);

  async function fetch(offset) {
    const res = await hospitalServices.getHospitals();

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
        labelButton="Add Hospital"
        routeActionButton={"/hospital/add"}
      />

      <br />

      <TableComponent
        header={headerTable}
        action={[
          {
            color: "info",
            name: "Edit",
            callback: (id) => {
              navigate("/hospital/edit/" + id);
            },
          },
          {
            color: "error",
            name: "Delete",
            callback: async (id) => {
              const res = await hospitalServices.deleteHospital(id);
              if (res) {
                toast.success("Hospital deleted successfully");
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
