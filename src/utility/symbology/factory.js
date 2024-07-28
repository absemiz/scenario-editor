import ms from 'milsymbol';
import { Icon } from 'leaflet';

const defaultIconSize = 48;

const SymbolFactory = {
    create: function (symbolicIdentificationCodingScheme, options) {
        const symbol = new ms.Symbol(
            symbolicIdentificationCodingScheme,
            options
        );
        const asSVG = symbol.asSVG();
        return asSVG;
    },
    createURL: function (symbolicIdentificationCodingScheme, options) {
        const asSVG = this.create(symbolicIdentificationCodingScheme, options);
        const encodedSVG = btoa(asSVG);
        const svgURL = `data:image/svg+xml;charset=utf-8;base64,${encodedSVG}`;
        return svgURL;
    },
    createIcon: function (symbolicIdentificationCodingScheme) {
        const svgURL = this.createURL(symbolicIdentificationCodingScheme, {size: defaultIconSize});
        const asIcon = new Icon(
            {
                iconUrl: svgURL,
                iconSize: [defaultIconSize, defaultIconSize]
            }
        );
        return asIcon;
    }
}

export default SymbolFactory;