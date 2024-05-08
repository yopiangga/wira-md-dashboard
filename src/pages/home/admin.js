import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaDatabase, FaHospital, FaUsers } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { StatisticServices } from "src/services/StatisticServices";

export function HomeAdminPage() {
  const [data, setData] = useState({});
  const statisticServices = new StatisticServices();

  useEffect(() => {
    fetch()
  }, []);

  async function fetch() {
    const res = await statisticServices.getStatisticByAdmin();
    setData(res?.data);
  }

  return (
    <div className="col-span-12 grid lg:grid-cols-5 grid-cols-2 gap-3">
      <Card title="Total Hospital" icon={<FaHospital />} value={data?.totalHospital ?? "-"} />
      <Card title="Total Doctor" icon={<FaUsers />} value={data?.totalDoctor ?? "-"}/>
      <Card title="Total Patient" icon={<FaUsers />} value={data?.totalPatient ?? "-"} />
      <Card title="Total Medical Record" icon={<FaDatabase />} value={data?.totalMedicalRecord ?? "-"} />
    </div>
  );
}

function Card({ title, icon, value }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg shadow-xs">
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="flex ">{icon}</div>
          <span className="text-sm font-semibold text-gray-900 line-clamp-1 mt-2">
            {value}
          </span>
          <span className="text-xs text-gray-500 line-clamp-1">{title}</span>
        </div>
      </div>
    </div>
  );
}
