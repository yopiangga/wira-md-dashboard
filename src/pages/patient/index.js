import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ActionIndex } from "src/components/action-index";
import { TableComponent } from "src/components/table";
import { PatientServices } from "src/services/PatientServices";

export function PatientPage() {
  const navigate = useNavigate();

  const patientServices = new PatientServices();

  const [data, setData] = useState([]);

  const headerTable = [
    { code: "id", name: "ID" },
    { code: "nik", name: "NIK" },
    { code: "name", name: "Name" },
    { code: "address", name: "Address" },
    { code: "phone", name: "No Telephone" },
    { code: "image", name: "Image", type: "image" },
    { code: "action", name: "Action" },
  ];

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    const response = await patientServices.getPatients();
    setData(response.data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="col-span-12">
      <ActionIndex
        handleSearch={handleSearch}
        labelButton="Add Patient"
        routeActionButton={"/patient/add"}
      />

      <br />

      <TableComponent
        header={headerTable}
        action={[
          {
            color: "info",
            name: "Edit",
            callback: (id) => {
              navigate("/patient/edit/" + id);
            },
          },
          {
            color: "error",
            name: "Delete",
            callback: async (id) => {
              const res = await patientServices.deletePatient(id);
              if (res) {
                toast.success("Success delete patient");
                await fetchPatient();
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
