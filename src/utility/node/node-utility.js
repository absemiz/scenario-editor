import { EntityKinds } from "../../data/entities/entity-kinds";

const NodeTypes = Object.freeze({
    EventNode:       'eventNode',
    EntityNode:      'entityNode',
    MarkerNode:      'markerNode',
    FunctionNode:    'functionNode',
    VariableNode:    'variableNode',
    ControlFlowNode: 'controlFlowNode',
    UtilityNode:     'utilityNode',
});

function createEntityNode(id, entity, position) 
{
    return {
        id: id,
        type: NodeTypes.EntityNode,
        position: position,
        data: { 
            kind: entity.kind,
            topLabel: entity.callsign, 
            handleLabel: 'Self',
            relatedFunctions: Object.values(EntityKinds[entity.kind].methods)
        }
    };
}

function createFunctionNode() {
    let key = -1;
    return function (id, name, position, flowDependent, inputs, outputs) {
        ++key;
        return {
            id: `${id}-${key}`,
            type: NodeTypes.FunctionNode,
            position: position,
            data: {
                name: name,
                flowDependent: flowDependent,
                inputs: inputs,
                outputs: outputs
            }
        };
    };
}

function createControlFlowNode() {
    let key = -1;
    return function (id, name, position, flowDependent, inputs, outputs) {
        ++key;
        return {
            id: `${id}-${key}`,
            type: NodeTypes.ControlFlowNode,
            position: position,
            data: {
                name: name,
                flowDependent: flowDependent,
                inputs: inputs,
                outputs: outputs
            }
        };
    };
}

function createMarkerNode(id, name, position, outputs) {
    let key = -1;
    return () => {
        ++key;
        return {
            id: `${id}-${key}`,
            type: NodeTypes.MarkerNode,
            position: position,
            data: {
                name: name,
                outputs: outputs,
            }
        };
    };
}

export { NodeTypes, createEntityNode, createFunctionNode, createMarkerNode, createControlFlowNode };