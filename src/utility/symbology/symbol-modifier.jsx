
const SymbolModifier = {
    setAffiliation: (SIDC, affiliation) => {
        const AffiliationParameterPosition = 3;
        const AffiliationTable = {
            'friend':  '3',
            'neutral': '4',
            'hostile': '6',
            'unknown': '1'
        };
        if (!(affiliation in AffiliationTable))
        {
            return SIDC;
        }

        return (
            SIDC.slice(0, AffiliationParameterPosition)     + 
            AffiliationTable[affiliation]                   + 
            SIDC.slice(AffiliationParameterPosition + 1)
        );
    }
};

export default SymbolModifier;