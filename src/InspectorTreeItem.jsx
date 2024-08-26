import { TreeItem2 } from "@mui/x-tree-view";
import getItemIcon from "./utility/tree-item/icons";

import { ItemsOnMapContext } from "./ItemsOnMapContext";
import React, { useContext } from "react";

import { Entities } from "./data/entities/entities";
import { Markers } from "./data/markers/markers";
import { useMap } from 'react-leaflet';
import { ApplicationContext } from "./ApplicationContext";
import ApplicationState from "./utility/state/state";

function InspectorTreeItem({itemId, label, children}) {

    const { getApplicationState, setApplicationState } = useContext(ApplicationContext);
    const { itemsOnMap, addItemToMap, removeItemFromMap } = useContext(ItemsOnMapContext);

    const map = useMap();

    const isMarker = Markers.findIndex((marker) => marker.id === itemId) !== -1;

    return (
    <TreeItem2
    itemId={itemId}
    label={label}
    children={children}
    slots={{ icon: getItemIcon(itemId) }}
    draggable={true}
    onDragStart={
        (event) => {
            map.dragging.disable();
            if (!itemId.startsWith('root')) {
                console.log("Drag started.");
            }
            event.stopPropagation();
        }}
    onDragEnd={
        (event) => {
            if (!itemId.startsWith('root')) {
                addItemToMap(
                    (
                    isMarker ? 
                       Markers.find((marker) => marker.id === itemId) : 
                       Entities.find((entity) => entity.id === itemId)
                    ),
                    map.mouseEventToLatLng(event)
                );
                if (!isMarker) setApplicationState(ApplicationState.ADD_ENTITY_TO_MAP);
            }
            map.dragging.enable();
            event.stopPropagation();
        }
    }
    />);
}

export default InspectorTreeItem;