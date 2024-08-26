import { Entities } from "../../data/entities/entities";
import MarkerIconUtility from "../marker/marker-icon-utility";
import SymbolFactory from "../symbology/factory";


const getItemIcon = (itemId) => {
    const entity = Entities.find((entity) => entity.id === itemId)
    if (entity)
    {
        return SymbolFactory.createComponentIcon(entity.sidc);
    }
    else
    {
        return MarkerIconUtility.getMarkerComponentIcon(itemId);
    }
};

export default getItemIcon;