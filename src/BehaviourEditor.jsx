import React from "react";
import { Dialog, IconButton, AppBar, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Close } from "@mui/icons-material";
import { ApplicationContext } from "./ApplicationContext";
import ApplicationState from "./utility/state/state";

import { 
    ReactFlow,
    Background,
    useNodesState, 
    useEdgesState,
    addEdge,
    useReactFlow
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import SceneHierarchyView from "./SceneHierarchyView";

import EventNode from "./EventNode";
import EntityNode from "./EntityNode";
import FunctionNode from "./FunctionNode";

import { createFunctionNode } from "./utility/node/node-utility";

import { EntityKinds } from "./data/entities/entity-kinds";

const styles = {
    reactFlow: {
        backgroundColor: '#1E1E1E'
    },
};

const nodeTypes = { 
    'eventNode': EventNode, 
    'entityNode': EntityNode,
    'functionNode': FunctionNode
};

const initialNodes = [
    { 
        id: 'onScenarioStarted', 
        type: 'eventNode', 
        position: { x: 0, y: -150 }, 
        data: { label: 'OnScenarioStarted' },
    },
    { 
        id: 'onScenarioTick', 
        type: 'eventNode', 
        position: { x: 0, y: 0 }, 
        data: { label: 'OnScenarioTick' },
    },
    { 
        id: 'onScenarioFinished', 
        type: 'eventNode', 
        position: { x: 0, y: 150 }, 
        data: { label: 'OnScenarioFinished' },
    },
];
const initialEdges = [];

function BehaviourEditor() {
    const { screenToFlowPosition, addNodes } = useReactFlow();
    const { getApplicationState, setApplicationState } = React.useContext(ApplicationContext);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = React.useCallback(
        (edgeParameters) =>  {
            console.log(`Edge parameters: ${edgeParameters}`); 
            setEdges((edges) => addEdge(edgeParameters, edges))
        },
        [setEdges]
    );

    const [relatedFunctionsListOpen, setRelatedFunctionListOpen] = React.useState(false);
    const [relatedFunctionListPosition, setRelatedFunctionListPosition] = React.useState(null);
    const [relatedFunctionList, setRelatedFunctionList] = React.useState([]);

    const RelatedFunctions = () => {
        return (
            <List
            sx={{
                position: 'absolute',
                top: relatedFunctionListPosition.y,
                left: relatedFunctionListPosition.x,
                bgcolor: '#2c2c2c',  
                color: '#ffffff',
                borderRadius: '4px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                padding: '8px 0',
                minWidth: '150px',
                zIndex: 1000
            }}
        >
            {relatedFunctionList.map((functionName, index) => (
                <ListItem
                    key={index}
                    sx={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: '#3c3c3c',
                        }
                    }}
                    onClick={
                        (event) => {
                            const functionData = EntityKinds.FixedWing.methods[functionName];
                            const functionNode = createFunctionNode(
                                `${functionName}${index}`,
                                functionName,
                                screenToFlowPosition({ x: event.clientX, y: event.clientY }),
                                functionData.flowDependent,
                                functionData.inputs,
                                functionData.outputs
                            );
                            setRelatedFunctionListOpen(false);
                            addNodes([functionNode])
                        }
                    }
                >
                    <ListItemText primary={`ƒ ${functionName}`} />
                </ListItem>
            ))}

        </List>
        );
    };

    return (
    <Dialog 
    fullScreen={true} 
    open={getApplicationState() === ApplicationState.BEHAVIOUR_EDITOR_OPENED}
    >
        <AppBar>
            <IconButton onClick={() => setApplicationState(ApplicationState.INITIALIZATION)}>
                <Close />
            </IconButton>
        </AppBar>
            <ReactFlow 
            nodes={nodes} 
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectEnd={(event, connectionState) => {
                if (
                    !connectionState.toHandle && 
                    connectionState.fromNode.data.handleLabel === 'Self'
                )
                {
                    setRelatedFunctionList([...connectionState.fromNode.data.relatedFunctions]);
                    setRelatedFunctionListPosition({ x: event.x, y: event.y });
                    setRelatedFunctionListOpen(true); 
                }
            }}
            style={styles.reactFlow}
            >
                { relatedFunctionsListOpen && <RelatedFunctions /> }
                <Background variant="dots" gap={12} />
                <SceneHierarchyView 
                screenToFlowPosition={screenToFlowPosition} 
                addNodes={addNodes}/>
            </ReactFlow>
    </Dialog>
    );
}

export default BehaviourEditor;
