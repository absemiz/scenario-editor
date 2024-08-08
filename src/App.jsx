import Map from './Map';
import ApplicationState from './utility/state/state';

import './styles.css';
import { useState } from 'react';

import StateButton from './StateButton';
import InspectorView from './InspectorView';
import { entities } from './data/entities/entities';
import Locations from './data/locations/locations';

function App() {
  const [applicationState, setApplicationState] = useState(ApplicationState.INITIALIZATION);
  const [entitiesOnMap, setEntitiesOnMap] = useState(
    entities.map((entity) => {
      return {
        ...entity,
        position: entity.name === 'F35A' ? 
        [Locations.athens.latitude, Locations.athens.longitude] : [Locations.izmir.latitude, Locations.izmir.longitude],
        updatePosition: function() {
          this.position = [this.position[0] + 0.005, this.position[1] + 0.005];
        }
      }
    })
  );


  return (
    <>
      <InspectorView></InspectorView>
      <StateButton 
      properties={{ 
        applicationState: applicationState, 
        setApplicationState: setApplicationState,
        }}
      />
      <Map properties={{state: applicationState, entitiesOnMap: entitiesOnMap, setEntitiesOnMap: setEntitiesOnMap}} />
    </>
  );
}

export default App
