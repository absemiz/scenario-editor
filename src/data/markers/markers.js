import { LocationOn, KeyboardTab } from "@mui/icons-material"

const Markers = [
    {
        id: 'waypoint',
        label: 'Waypoint',
        kind: 'control-measures',
        icon: LocationOn
    },
    {
        id: 'trigger',
        label: 'Trigger',
        kind: 'event',
        icon: KeyboardTab
    }
];

const MarkersTree = [
    {
        id: 'control-measures',
        label: 'Control Measures',
        children: Markers.filter((marker) => marker.kind === 'control-measures')
    },
    {
        id: 'event',
        label: 'Event',
        children: Markers.filter((marker) => marker.kind === 'event')
    }
];

export { Markers, MarkersTree };