import SymbolFactory from "../symbology/factory";
import { Entities } from "../../data/entities/entities";

const EntityIconUtility = {
    getEntityLeafletIcon: function (id) {
        const entity = Entities.find((entity) => entity.id === id);
        return SymbolFactory.createIcon(entity.sidc);
    }
};

export default EntityIconUtility;