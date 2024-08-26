import SymbolFactory from "./utility/symbology/factory";
import { Marker } from "react-leaflet";
import { Markers } from "./data/markers/markers";
import MarkerIconUtility from "./utility/marker/marker-icon-utility";

function ItemView({ properties }, key) {
    const { item } = properties;

    const isMarker = Markers.findIndex(
        (marker) => { return marker.id === item.id }
    ) !== -1;

    let icon;
    if (isMarker)
    {
        icon = MarkerIconUtility.getLeafletMarkerIcon(item.id);
    }
    else
    {
        icon = SymbolFactory.createIcon(item.sidc);
    }

    return (
        <Marker
        eventHandlers={{contextmenu: (event) => {
            console.log('rightClickedMarker')
            event.originalEvent.stopPropagation();
        }}}
        title={item.name}
        key={key}
        position={item.position}
        icon={icon}
        >
        </Marker>
    )
}

export default ItemView