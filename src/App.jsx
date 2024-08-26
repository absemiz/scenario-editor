import Map from './Map';
import ApplicationState from './utility/state/state';

import './styles.css';
import React from 'react';
import { useState, useContext } from 'react';

import StateButton from './StateButton';
import BehaviourEditor from './BehaviourEditor';


import { ItemsOnMapContext, ItemsOnMapProvider } from './ItemsOnMapContext';
import { ApplicationContext } from './ApplicationContext';

import { ReactFlowProvider } from '@xyflow/react';


function App() {
  const { applicationState, setApplicationState } = useContext(ApplicationContext);

  return (
    <>
      <StateButton />
      <ItemsOnMapProvider>
        <ReactFlowProvider>
          <BehaviourEditor />
        </ReactFlowProvider>
        <Map properties={{applicationState: applicationState, setApplicationState: setApplicationState}} />
      </ItemsOnMapProvider>
    </>
  );
}

export default App;
