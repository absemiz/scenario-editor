import '../node_modules/leaflet/dist/leaflet.css'
import { MapContainer, TileLayer} from 'react-leaflet';
import EntityView from './EntityView';
import ApplicationState from './utility/state/state';
import Locations from './data/locations/locations';

import { useEffect, useState } from 'react';

function Map({ properties }) {

    const { state, entitiesOnMap, setEntitiesOnMap} = properties;
    const initialZoom = 8;

    useEffect(
        () => {
            if (state === ApplicationState.RUN) {
                const interval = setInterval(() => {
                    setEntitiesOnMap((currentEntities) => {
                        return currentEntities.map(
                            (entity) => {
                                entity.updatePosition();
                                return { ...entity };
                            }
                        );
                    });
                }, 
                1000
            );
                return () => clearInterval(interval);
            }
        },
        [state]
    );

    return (
    <MapContainer 
    center={[(Locations.izmir.latitude + Locations.athens.latitude) / 2, (Locations.izmir.longitude + Locations.athens.longitude) / 2]} 
    zoom={initialZoom}
    zoomControl={false}
    doubleClickZoom={false}
    scrollWheelZoom={true}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {entitiesOnMap.map((entityOnMap) => <EntityView properties={{entity: entityOnMap}}/>)}
    </MapContainer>
  );
}

export default Map;