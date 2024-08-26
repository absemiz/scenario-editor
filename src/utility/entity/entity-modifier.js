import SymbolModifier from "../symbology/symbol-modifier";

const EntityModifier = {
    setAffiliation: function (entity, affiliation) {
        const newSIDC = SymbolModifier.setAffiliation(entity.sidc, affiliation);
        return {
            ...entity,
            sidc: newSIDC,
            affiliation: affiliation
        };
    },
    setCallsign: function (entity, callsign) {
        return {
            ...entity,
            callsign: callsign
        }
    }
};

export default EntityModifier