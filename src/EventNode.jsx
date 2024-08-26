import { Handle, Position } from "@xyflow/react";
import { Typography } from "@mui/material";
import { KeyboardTab } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

const styles = {
  node: {
    display: 'flex',
    height: '80px',
    width: '200px',
    border: '2px solid #cc4444',
    borderRadius: '5px',
    background: '#2e2e2e',
    color: 'white',
  },
  topContainer: {
    display: 'flex',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#cc4444',
    color: 'white',
    top: 0
  },
  topIcon: {
    position: 'absolute',
    left: '8px',
    fontSize: '16px'
  },
  topLabel: {
    fontSize: '12px',
    fontWeight: 'bold'
  },
  handle: {
    top: '10px'
  }
};

function EventNode({ data }) {
  return (
    <div 
    style={styles.node}
    >
        <div 
        style={styles.topContainer}
        >
            <SvgIcon style={styles.topIcon} component={KeyboardTab} />
            <Typography style={styles.topLabel}>{data.label}</Typography>
            <Handle
            id="eventFlowStart"
            type="source"
            position={Position.Right}
            style={styles.handle}
            />
        </div>    
    </div>
  );
}

export default EventNode;
