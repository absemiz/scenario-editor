import React from "react";
import { ItemsOnMapContext } from "./ItemsOnMapContext";
import { ApplicationContext } from "./ApplicationContext";
import ApplicationState from "./utility/state/state";
import { Container, Typography, Button, Box } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";

import SceneHierarchyTreeItem from "./SceneHierarchyTreeItem";

import { useReactFlow } from "@xyflow/react";

const styles = {
    container: {
        height: '100vh',
        width: '20vw',
        minWidth: '250px',
        padding: '16px',
        margin: 0,
        position: 'fixed',
        left: 0,
        backgroundColor: '#1e1e1e',
        color: 'white',
        zIndex: 1000,
        opacity: 0.9,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        marginTop: '36px',
        textAlign: 'center',
        marginBottom: '16px',
    },
    treeContainer: {
        flexGrow: 1,
        overflowY: 'auto',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px',
    },
    button: {
        width: '80%',
        backgroundColor: '#1DB954',
        color: '#1e1e1e',
        '&:hover': {
            backgroundColor: '#17A74B',
        },
        '&:disabled': {
            backgroundColor: '#757575',
            color: '#B0B0B0',
        },
    },
};

function SceneHierarchyView({ screenToFlowPosition, addNodes }) {
    const { getEntities, getMarkers } = React.useContext(ItemsOnMapContext);
    const { getApplicationState, setApplicationState } = React.useContext(ApplicationContext);

    const blueForceUnits = getEntities((entity) => entity.affiliation === 'friend');
    const redForceUnits  = getEntities((entity) => entity.affiliation === 'hostile');
    const neutralUnits   = getEntities((entity) => entity.affiliation === 'neutral');
    const unknownUnits   = getEntities((entity) => entity.affiliation === 'unknown');
    const markers        = getMarkers((marker) => true);


    const hierarchyTree = [
        {
            id: 'blueforce',
            label: 'Blue Force',
            children: blueForceUnits.map((unit, index) => { 
                return {
                    ...unit,
                    id: unit.key,
                };
            }),
        },
        {
            id: 'redforce',
            label: 'Red Force',
            children: redForceUnits.map((unit, index) => {
                return {
                    ...unit,
                    id: unit.key
                };
            })
        },
        {
            id: 'neutral',
            label: 'Neutral',
            children: neutralUnits.map((unit) => {
                return {
                    ...unit,
                    id: unit.key
                };
            })
        },
        {
            id: 'unknown',
            label: 'Unknown',
            children: unknownUnits.map((unit) => {
                return {
                    ...unit,
                    id: unit.key
                };
            })
        },
        {
            id: 'markers',
            label: 'Markers',
            children: markers.map((marker) => {
                return {
                    ...marker,
                    id: marker.key
                };
            })
        }
    ];

    return (
        <Container style={styles.container}>
            <Box>
                <Typography variant="h6" style={styles.header}>
                    Scene Hierarchy
                </Typography>
            </Box>
            <Box style={styles.treeContainer}>
                <RichTreeView
                    items={hierarchyTree}
                    slots={{ item: SceneHierarchyTreeItem }}
                    slotProps={{ item: { screenToFlowPosition: screenToFlowPosition, addNodes: addNodes } }}
                />
            </Box>
            <Box style={styles.buttonContainer}>
                <Button
                    sx={styles.button}
                    onClick={() => {
                        getApplicationState() === ApplicationState.INITIALIZATION ? 
                        setApplicationState(ApplicationState.BEHAVIOUR_EDITOR_OPENED) :
                        setApplicationState(ApplicationState.INITIALIZATION) 
                    }}
                >
                    { getApplicationState() === ApplicationState.BEHAVIOUR_EDITOR_OPENED ? 'Open Map Editor' : 'Open Behaviour Editor' }
                </Button>
            </Box>
        </Container>
    );
}

export default SceneHierarchyView;