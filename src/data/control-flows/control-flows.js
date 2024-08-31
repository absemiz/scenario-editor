const ControlFlows = {
    if: {
        id: 'flow-if',
        name: '↪ If',
        flowDependent: false,
        inputs: ['Condition', 'FlowIn'],
        outputs: ['FlowTrue', 'FlowFalse']
    }
}

export default ControlFlows;