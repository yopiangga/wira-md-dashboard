import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PatientServices } from "src/services/PatientServices";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { MedicalRecordServices } from "src/services/MedicalRecordServices";
import { FaDiagnoses } from "react-icons/fa";
import { InputDefault } from "src/components/input/input-default";
import { Range } from "react-daisyui";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

export function MapPage() {
  const navigate = useNavigate();

  const patientServices = new PatientServices();
  const medicalRecordServices = new MedicalRecordServices()

  const [data, setData] = useState([]);
  const [medicalRecord, setMedicalRecord] = useState({
    data: [],
    ischemic: 0,
    hemorrhagic: 0,
    normal: 0,
  });
  const [tempMedicalRecord, setTempMedicalRecord] = useState({
    data: [],
    ischemic: 0,
    hemorrhagic: 0,
    normal: 0,
  });

  const [position, setPosition] = useState({
    latitude: null,
    longitude: null
  });
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    fetchLocation()
    fetchPatient();
    fetchMedicalRecord()
  }, []);

  function fetchLocation(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }

  const fetchPatient = async () => {
    const response = await patientServices.getPatients();

    setData(response.data);
  };

  const fetchMedicalRecord = async () => {
    const response = await medicalRecordServices.getDistanceMedicalRecord({
      latitude: position.latitude ?? -7.2769113,
      longitude: position.longitude ?? 112.7939166,
    });

    filter({data: response.data})
  };

  function filter({data, distance}){
    let temp = []

    if(distance){
      temp = data.filter((item) => item.distance <= distance)
    } else {
      temp = data
    }

    const ishcemic = temp.filter((item) => item.diagnoseByDoctor == "ischemic")
    const hemorrhagic = temp.filter((item) => item.diagnoseByDoctor == "hemorrhagic")
    const normal = temp.filter((item) => item.diagnoseByDoctor == "normal")

    setMedicalRecord({
      data: temp,
      ischemic: ishcemic.length,
      hemorrhagic: hemorrhagic.length,
      normal: normal.length,
    })
    
    if(!distance){
      setTempMedicalRecord({
        data: temp,
        ischemic: ishcemic.length,
        hemorrhagic: hemorrhagic.length,
        normal: normal.length,
      })
    }

  }

  return (
    <div className="col-span-12">
      <div className="grid grid-cols-12 gap-3 w-full mb-4">
      <div className="col-span-3">
        <div className="flex items-center gap-2 mb-2">
        <InputDefault label="Latitude" className="" handleChange={(e) => {
          setPosition({
            ...position,
            latitude: e.target.value
          })
        }} value={position.latitude} />
        <InputDefault label="Longitude" className="" handleChange={(e) => {
          setPosition({
            ...position,
            longitude: e.target.value
          })
          fetchMedicalRecord()
        }} value={position.longitude} />
        </div>
        <Range step={10} onChange={(e) => {
          const temp = parseInt(e.target.value) * 10
          setDistance(e.target.value)
          filter({data: tempMedicalRecord.data, distance: temp})
        }} value={distance}/>
      </div>
      <Card
        title="Normal Patient"
        icon={<FaDiagnoses />}
        value={medicalRecord.normal ?? "-"}
      />
      <Card
        title="Ischemic Patient"
        icon={<FaDiagnoses />}
        value={medicalRecord.ischemic ?? "-"}
      />
      <Card
        title="Hemorrhagic Patient"
        icon={<FaDiagnoses />}
        value={medicalRecord.hemorrhagic ?? "-"}
      />
     
      </div>
      <MapContainer
        center={[position.latitude ?? -7.2769113, position.longitude ?? 112.7939166]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-[calc(100vh-4rem)]"
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item, index) => {
          return (
            <Marker
              position={[item.latitude, item.longitude]}
              icon={DefaultIcon}
              key={index}
            >
              <Popup>
                <PopUpElement data={item} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

function PopUpElement({ data }) {
  return (
    <div>
      <h1 className="text-lg font-bold">{data.name}</h1>
      <p>{data.address}</p>
      <p>{data.phone}</p>
    </div>
  );
}


function Card({ title, icon, value }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg shadow-xs col-span-3">
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