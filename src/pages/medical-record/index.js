import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ActionIndex } from "src/components/action-index";
import { TableComponent } from "src/components/table";
import { MedicalRecordServices } from "src/services/MedicalRecordServices";

export function MedicalRecordPage() {
  const navigate = useNavigate();
  const medicalRecordServices = new MedicalRecordServices();

  const [data, setData] = useState([]);

  const headerTable = [
    { code: "id", name: "ID" },
    { code: "patient", name: "Patient Name" },
    { code: "image", name: "Image", type: "image" },
    { code: "diagnosisAI", name: "Diagnosis AI" },
    { code: "diagnosisDoctor", name: "Diagnosis Doctor" },
    { code: "description", name: "Description" },
    { code: "diagnoseTime", name: "Diagnose Time" },
    { code: "doctor", name: "Doctor Name" },
    { code: "operator", name: "Operator Name" },
    { code: "hospital", name: "Hospital Name" },
    { code: "action", name: "Action" },
  ];

  useEffect(() => {
    fetchMedicalRecord();
  }, []);

  async function fetchMedicalRecord() {
    const res = await medicalRecordServices.getMedicalRecords();

    if (res) {
      setData(res.data);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="col-span-12">
      <ActionIndex
        handleSearch={handleSearch}
        labelButton="Add Medical Record"
        routeActionButton={"/medical-record/add"}
      />

      <br />

      <TableComponent
        header={headerTable}
        action={[
          {
            color: "info",
            name: "Edit",
            callback: (id) => {
              navigate("/medical-record/edit/" + id);
            },
          },
          {
            color: "error",
            name: "Delete",
            callback: async (id) => {
              const res = await medicalRecordServices.deleteMedicalRecord(id);

              if (res) {
                toast.success("Medical Record has been deleted");
                fetchMedicalRecord();
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
