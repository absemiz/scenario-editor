import React from "react";

import { TreeItem2 } from "@mui/x-tree-view";
import { ItemsOnMapContext } from "./ItemsOnMapContext";
import { ApplicationContext } from "./ApplicationContext";
import ApplicationState from "./utility/state/state";

import { createEntityNode, createMarkerNode } from "./utility/node/node-utility";

import { isMarker } from "./utility/tree-item/query";
import MarkerKinds from "./data/markers/marker-kinds";

function SceneHierarchyTreeItem({ itemId, label, children, screenToFlowPosition, addNodes} ) {
    const { getApplicationState, } = React.useContext(ApplicationContext);

    const rootItemIDTable = [
        'blueforce',
        'redforce',
        'neutral',
        'unknown',
        'markers'
    ];
    const { getIconOf, getCallsignOf, itemsOnMap } = React.useContext(ItemsOnMapContext);

    const IconComponent = rootItemIDTable.includes(itemId) ? null : getIconOf(itemId);
    const callsign = rootItemIDTable.includes(itemId) ? label : getCallsignOf(itemId);
    return (
        <TreeItem2
        draggable={getApplicationState() === ApplicationState.BEHAVIOUR_EDITOR_OPENED}
        itemId={String(itemId)}
        label={callsign}
        children={children}
        slots={{icon: IconComponent}}
        onDragStart={() => {}}
        onDragEnd={(event) => {
            if (!rootItemIDTable.includes(itemId))
            {
                event.preventDefault();
                const flowPosition = screenToFlowPosition(
                    {
                        x: event.clientX,
                        y: event.clientY
                    }
                );
                const item = itemsOnMap.at(itemId);
                if (item)
                {
                    let node;
                    if (isMarker(item))
                    {
                        node = createMarkerNode(
                            String(itemId),
                            item.callsign,
                            flowPosition,
                            MarkerKinds[item.kind][item.id].outputs
                        )();
                    }
                    else
                    {
                        node = createEntityNode(
                            String(itemId),
                            item,
                            flowPosition,
                            item.callsign
                        );
                    }
                    addNodes([node]);
                }
                else
                {
                    console.log('Entity is null.');
                } 
            }
        }}
        >
        </TreeItem2>
    );
}

export default SceneHierarchyTreeItem;