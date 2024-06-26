


import { useNavigate, useSearchParams } from "react-router-dom";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoloaction";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";

function Map() {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();
	const [mapLat, mapLng] = useUrlPosition();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	useEffect(
		function () {
			if (geolocationPosition)
				setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
		},
		[geolocationPosition]
	);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use your position"}
				</Button>
			)}

			<MapContainer
				center={mapPosition}
				zoom={15}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution="Google Maps"
					url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"

				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}

				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;



// import { useFetcher, useNavigate, useSearchParams } from 'react-router-dom';
// import styles from './Map.module.css';
// import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
// import { useContext, useEffect, useState } from 'react';
// import { useCities } from '../contexts/CitiesContext';
// import { useGeolocation } from '../hooks/useGeoloaction';
// import Button from './Button';

// import { useUrlPosition } from '../hooks/useUrlPosition';

// function Map() {

// 	const navigate = useNavigate();


// 	const [mapPosition, setMapPosition] = useState([40, 0]);
// 	const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

// 	const [mapLat, mapLng] = useUrlPosition();
// 	const { cities } = useCities();

// 	useEffect(
// 		function () {
// 			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
// 		},
// 		[mapLat, mapLng]
// 	);

// 	useEffect(function () {
// 		if (geolocationPosition)
// 			setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
// 	}, [geolocationPosition]);

// 	return (
// 		<div className={styles.mapContainer} onClick={() => { navigate("form") }}>
// 			{
// 				!geolocationPosition && <Button
// 					type='position'
// 					onClick={getPosition}>
// 					{isLoadingPosition ? "Loading..." : "Use your position"}
// 				</Button>}

// 			<MapContainer
// 				center={mapPosition}
// 				zoom={14}
// 				scrollWheelZoom={true}
// 				className={styles.map}
// 			>
// 				<TileLayer
// 					attribution="Google Maps"
// 					url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
// 				/>

// 				{
// 					cities.map(citi => (
// 						<Marker
// 							key={citi.id}
// 							position={[citi.position.lat
// 								, citi.position.lng]}>
// 							<Popup>
// 								<span>{citi.emoji}</span>
// 								<span>{citi.cityName}</span>
// 							</Popup>
// 						</Marker>
// 					))
// 				}

// 				<ChangeCenter
// 					position={mapPosition}
// 				/>;

// 				<MapClick />
// 			</MapContainer>,
// 		</div>
// 	)
// }

// function ChangeCenter({ position }) {
// 	if (!position[0] || !position[1]) return null;
// 	const map = useMap();
// 	map.setView(position)
// 	return null;
// }

// function MapClick() {
// 	const navigate = useNavigate();

// 	useMapEvents({
// 		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
// 	})
// }

// export default Map;