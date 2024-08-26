import ApplicationState from './utility/state/state';
import { Fab } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { ApplicationContext } from './ApplicationContext';

import React from 'react';
import { useContext } from 'react';

function StateButton({ properties }) {
    const { getApplicationState, setApplicationState } = useContext(ApplicationContext);
    return (
        <Fab 
        style={
          {
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '20px',
            zIndex: 1000
          }
        }
        onClick={(e) => {
            setApplicationState(
              getApplicationState() === ApplicationState.INITIALIZATION ? 
              ApplicationState.RUN : ApplicationState.INITIALIZATION
            );
            e.stopPropagation();
          }}
          >
            {
                getApplicationState() === ApplicationState.RUN ? 
                <Pause /> : <PlayArrow />
            }
        </Fab>
    )
}

export default StateButton;