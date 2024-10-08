import React from 'react';
import { Handle, Position } from "@xyflow/react";
import { Typography, SvgIcon } from "@mui/material";
import { Flag } from "@mui/icons-material";

const styles = {
  node: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    border: '2px solid #1DB954',
    borderRadius: '5px',
    backgroundColor: '#2e2e2e',
    color: 'white',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#1DB954',
    color: 'white',
    position: 'relative',
    top: 0,
  },
  topIcon: {
    position: 'absolute',
    left: '8px',
    fontSize: '16px',
  },
  topLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
  },
  handle: {
    top: '10px',
  },
  inputOutputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 8px',
    backgroundColor: '#2e2e2e',
    marginBottom: '2px',
    borderRadius: '3px',
    position: 'relative',
  },
  inputText: {
    fontSize: '8px',
    marginLeft: '8px',
  },
  outputText: {
    fontSize: '8px',
    marginRight: '8px',
    textAlign: 'right',
    flex: 1,
  },
};

function MarkerNode({ data }) {
  return (
    <div style={styles.node}>
      <div style={styles.topContainer}>
        <SvgIcon style={styles.topIcon} component={Flag} />
        <Typography style={styles.topLabel}>{`${data.name}`}</Typography>
        {data.onFlow && (
          <Handle
            id={`functionFlowOutput`}
            type="source"
            position={Position.Right}
            style={styles.handle}
          />
        )}
      </div>
      <div>
        {data.outputs && data.outputs.map((outputName, index) => (
          <div key={`output${index}`} style={styles.inputOutputContainer}>
            <Typography style={styles.outputText}>
              {outputName}
            </Typography>
            <Handle 
              id={`output${index}`}
              type="source"
              position={Position.Right}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarkerNode;
