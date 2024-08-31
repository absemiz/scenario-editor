const Markers = [
    {
        id: 'waypoint',
        label: 'Waypoint',
        name: 'Waypoint',
        kind: 'control-measures',
    },
    {
        id: 'trigger',
        label: 'Trigger',
        name: 'Trigger',
        kind: 'event',
    }
];

const MarkersTree = [
    {
        id: 'root-control-measures',
        label: 'Control Measures',
        children: Markers.filter((marker) => marker.kind === 'control-measures')
    },
    {
        id: 'root-event',
        label: 'Event',
        children: Markers.filter((marker) => marker.kind === 'event')
    }
];


export { Markers, MarkersTree };