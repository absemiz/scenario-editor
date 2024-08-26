import '../node_modules/leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet';

import ItemView from './ItemView';
import ApplicationState from './utility/state/state';
import Locations from './data/locations/locations';
import InspectorView from './InspectorView';
import SceneHierarchyView from './SceneHierarchyView';

import { useEffect, useContext } from 'react';

import { ItemsOnMapContext } from './ItemsOnMapContext';

function Map({ properties }) {

    const { applicationState, setApplicationState, setEntitiesOnMap} = properties;
    const initialZoom = 6;

    const {itemsOnMap, addItemToMap, removeItemFromMap} = useContext(ItemsOnMapContext);

    useEffect(
        () => {
            if (applicationState === ApplicationState.RUN) {
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
        [applicationState]
    );

    return (
    <MapContainer 
    center={Object.values(Locations.ankara)} 
    zoom={initialZoom}
    zoomControl={false}
    doubleClickZoom={false}
    scrollWheelZoom={true}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {
        itemsOnMap.map((item) => (<ItemView properties={{ item: item, position: item.position }} key={item.key} />))}
        <InspectorView properties={{ applicationState: applicationState, setApplicationState: setApplicationState }}/>
        <SceneHierarchyView />
    </MapContainer>
  );
}

export default Map;