import { EntityKinds } from "../../data/entities/entity-kinds";

const NodeTypes = Object.freeze({
    EventNode:       'eventNode',
    EntityNode:      'entityNode',
    MarkerNode:      'markerNode',
    FunctionNode:    'functionNode',
    VariableNode:    'variableNode',
    ControlFlowNode: 'controlFlowNode',
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
            relatedFunctions: [
                'getPosition',
                'getAltitude',
                'getVelocity',
                'getHeading',
            ] 
        }
    };
}

function createFunctionNode(id, name, position, flowDependent, inputs, outputs) {
    return {
        id: id,
        type: NodeTypes.FunctionNode,
        position: position,
        data: {
            name: name,
            flowDependent: flowDependent,
            inputs: inputs,
            outputs: outputs
        }
    }
}

export { NodeTypes, createEntityNode, createFunctionNode };