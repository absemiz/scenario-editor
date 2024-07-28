import Map from './Map';
import ApplicationState from './utility/state/state';

import './styles.css';
import { useState } from 'react';

import StateButton from './StateButton';
import InspectorView from './InspectorView';


function App() {
  const [applicationState, setApplicationState] = useState(ApplicationState.INITIALIZATION);
  return (
    <>
      <InspectorView></InspectorView>
      <StateButton 
      properties={{ 
        applicationState: applicationState, 
        setApplicationState: setApplicationState 
        }}
      />
      <Map properties={{state: applicationState}}></Map>
    </>
  );
}

export default App
