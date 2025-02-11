import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const OpenStreetMapComponent = ({ address, lat, lng }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={15} style={mapContainerStyle}>
      {/* Load OpenStreetMap tiles */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Marker on the locker location */}
      <Marker position={[lat, lng]}>
        <Popup>
          {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default OpenStreetMapComponent;
