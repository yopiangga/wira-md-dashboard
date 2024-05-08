import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PatientServices } from "src/services/PatientServices";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

export function MapPage() {
  const navigate = useNavigate();

  const patientServices = new PatientServices();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    const response = await patientServices.getPatients();
    setData(response.data);
  };

  return (
    <div className="col-span-12">
      <MapContainer
        center={[-6.175392, 106.827153]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "500px",
          width: "100%",
        }}
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
