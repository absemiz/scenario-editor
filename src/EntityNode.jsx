import { Handle, Position } from "@xyflow/react";
import { Typography, Menu, MenuItem } from "@mui/material";
import { AccountTree } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import React from "react";
import { useReactFlow } from "@xyflow/react";

const styles = {
    node: {
      display: 'flex',
      flexDirection: 'column',
      height: '80px',
      width: '200px',
      border: '1px solid #2979FF',
      borderRadius: '5px',
      background: '#2e2e2e',
      color: 'white',
    },
    topContainer: {
      display: 'flex',
      height: '25%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2979FF',
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
    mainContainer: {
        display: 'flex',
        height: '75%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    handle: {
      top: '10px'
    },
    handleLabel: {
        position: 'absolute',
        right: '8px',
        fontSize: '12px',
        top: '50%',
        transform: 'translateY(-50%)'
    }
  };

  
  
function EntityNode({ data }) {
    return (
        <div 
        style={styles.node}
        >
            <Handle
                id="entitySelf"
                type="source"
                position={Position.Right}
            />
            <div 
            style={styles.topContainer}
            >
                <SvgIcon style={styles.topIcon} component={AccountTree} />
                <Typography style={styles.topLabel}>{`${data.topLabel}(${data.kind})`}</Typography>
            </div>
            <div style={styles.mainContainer}>
                <Typography style={styles.handleLabel}>Self</Typography>
            </div>
        </div>
      );
}

export default EntityNode;