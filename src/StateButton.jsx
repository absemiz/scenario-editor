import ApplicationState from './utility/state/state';
import { Fab } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

function StateButton({ properties }) {
    const { applicationState, setApplicationState } = properties;
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
              applicationState === ApplicationState.INITIALIZATION ? 
              ApplicationState.RUN : ApplicationState.INITIALIZATION
            );
            e.stopPropagation();
          }}
          >
            {
                applicationState === ApplicationState.INITIALIZATION ? 
                <PlayArrow /> : <Pause />
            }
        </Fab>
    )
}

export default StateButton;