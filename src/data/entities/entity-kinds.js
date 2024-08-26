
const EntityKinds = Object.freeze(
    {
        FixedWing: {
            name: 'FixedWing',
            methods: {
                getPosition: {
                    name: 'getPosition',
                    flowDependent: false,
                    inputs: ['Target'],
                    outputs: ['Latitude', 'Longitude'],
                    description: 'Returns position of the target.'
                },
                getAltitude: {
                    name: 'getAltitude',
                    flowDependent: false,
                    inputs: ['Target'],
                    outputs: ['Altitude'],
                },
                getHeading: {
                    name: 'getHeading',
                    flowDependent: false,
                    inputs: ['Target'],
                    outputs: ['Heading'],
                },
                getVelocity: {
                    name: 'getVelocity',
                    flowDependent: false,
                    inputs: ['Target'],
                    outputs: ['X', 'Y', 'Z']
                }
            }
        }
    }
);


export { EntityKinds };