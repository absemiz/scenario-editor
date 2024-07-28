import SymbolFactory from "./utility/symbology/factory";
import { Marker } from "react-leaflet";

function EntityView({ properties }) {
    const { entity, position } = properties;
    return (
        <Marker 
        position={position}
        icon={SymbolFactory.createIcon(entity.sidc)}>
        </Marker>
    )
}

export default EntityView