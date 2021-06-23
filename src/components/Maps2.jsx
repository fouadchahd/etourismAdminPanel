import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

import mapStyle from "./components.styles/mapStyle.js";
import yellowMarker from "../asserts/yellow-map-marker.png";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();
const mapContainerStyle = {
  height: "300px",
  width: "100%",
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 34.018803,
  lng: -6.832977,
};
const Maps2 = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const onMapClick = React.useCallback(async (e) => {
    setMarkers((current) => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    props.pickLocation({
      formattedAddress: "FOR THE FORMATTED ADDRESS YOU MUST ENABLE BILING",
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
      city: {
        id: 4,
      },
    });
    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng())
      .then((response) => {
        console.log("geocoder response", response);
      })
      .catch((err) => {
        console.log("geocoder error catched", err);
      });
    // await axios
    //   .get(
    //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${GOOGLE_MAPS_API_KEY}`
    //   )
    //   .then(({ data }) => console.log(JSON.stringify(data)))
    //   .catch((error) => console.log(JSON.stringify(error)));
  }, []);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(props.zoom);
  }, []);
  if (loadError)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "gray",
          height: "200px",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            alignItems: "center",
            justifySelf: "center",
          }}
        >
          Vérifier votre connexion pour afficher la maps
        </p>
      </div>
    );
  if (!isLoaded) return "Chargement...";
  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={props.zoom}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: yellowMarker,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Maps2;
