import SymbolFactory from "./utility/symbology/factory";
import { Marker } from "react-leaflet";

function EntityView({ properties }) {
    const { entity } = properties;
    return (
        <Marker
        position={entity.position}
        icon={SymbolFactory.createIcon(entity.sidc)}>
        </Marker>
    )
}

export default EntityView