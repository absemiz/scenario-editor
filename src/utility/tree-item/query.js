import { Entities } from "../../data/entities/entities";
import { Markers } from "../../data/markers/markers";

function isMarker(treeItem) {
    return Markers.findIndex((marker) => marker.id === treeItem.id) !== -1;
}

export { isMarker };