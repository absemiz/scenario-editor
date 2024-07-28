import '../node_modules/leaflet/dist/leaflet.css'
import { MapContainer, TileLayer} from 'react-leaflet';
import locations from "./data/locations/locations";
import { entities } from './data/entity/entities';
import EntityView from './EntityView';
import ApplicationState from './utility/state/state';

import { useEffect, useState } from 'react';

function Map({ properties }) {

    const { state } = properties;
    const izmir = locations.izmir;
    const athens = locations.athens;
    const initialZoom = 8;

    const [entityPosition, setEntityPosition] = useState([izmir.latitude, izmir.longitude]);
    const [entityPosition2, setEntity2Position] = useState([athens.latitude, athens.longitude]);

    useEffect(
        () => {
            if (state === ApplicationState.RUN) {
                const interval = setInterval(() => {
                    setEntityPosition(
                        (currentPosition) => [
                            currentPosition[0] + 0.005,
                            currentPosition[1] + 0.005
                        ]
                    )
                    setEntity2Position(
                        (currentPosition) => [
                            currentPosition[0] + 0.005,
                            currentPosition[1] + 0.005
                        ]
                    )
                },
                    1000
                );
                return () => clearInterval(interval);
            }
        },
        [state]
    )

    return (
    <MapContainer 
    center={[(izmir.latitude + athens.latitude) / 2, (izmir.longitude + athens.longitude) / 2]} 
    zoom={initialZoom}
    zoomControl={false}
    doubleClickZoom={false}
    scrollWheelZoom={true}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <EntityView properties={{position: entityPosition, entity: entities[0]}}/>
        <EntityView properties={{position: entityPosition2, entity: entities[1]}}/>
    </MapContainer>
  );
}

export default Map;