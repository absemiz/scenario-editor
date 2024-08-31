const UtilityFunctions = {
    equals: {
        id: 'util-equals',
        name: 'ƒ Equals',
        flowDependent: false,
        inputs: ['U', 'V', 'Tolerance'],
        outputs: ['Result']
    },
    angleBetween: {
        id: 'util-angle-between',
        name: 'ƒ AngleBetween',
        flowDependent: false,
        inputs: ['U', 'V'],
        outputs: ['Angle']
    },
    composeVector3: {
        id: 'util-compose-vector3',
        name: 'ƒ ComposeVector3',
        flowDependent: false,
        inputs: ['X', 'Y', 'Z'],
        outputs: ['V']
    },
    decomposeVector3: {
        id: 'util-decompose-vector3',
        name: 'ƒ DecomposeVector3',
        flowDependent: false,
        inputs: ['V'],
        outputs: ['X', 'Y', 'Z']
    },
    makeScalar: {
        id: 'util-decompose-vector3',
        name: 'ƒ DecomposeVector3',
        flowDependent: false,
        inputs: [],
        textFieldInput: 'number',
        outputs: ['S']
    }
}

export default UtilityFunctions;