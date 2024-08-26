import ms from 'milsymbol';
import { Icon } from 'leaflet';
import React from 'react';


const defaultIconSize = 36;
const treeItemIconSize = defaultIconSize / 3.0;

const SymbolFactory = {
    create: function (symbolicIdentificationCodingScheme, options) {
        const symbol = new ms.Symbol(
            symbolicIdentificationCodingScheme,
            options
        );
        return symbol;
    },
    createSVG: function (symbolicIdentificationCodingScheme, options) {
        const symbol = this.create(symbolicIdentificationCodingScheme, options);
        return symbol.asSVG();
    },
    createDOM: function (symbolicIdentificationCodingScheme, options) {
        const symbol = this.create(symbolicIdentificationCodingScheme, options);
        return symbol.asDOM();
    },
    createURL: function (symbolicIdentificationCodingScheme, options) {
        const asSVG = this.createSVG(symbolicIdentificationCodingScheme, options);
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
    },
    createComponentIcon: function(symbolicIdentificationCodingScheme, size) {
        const iconSVG = this.createSVG(symbolicIdentificationCodingScheme, { size: size ? size : treeItemIconSize });
        return () => <span dangerouslySetInnerHTML={{ __html: iconSVG }}></span>;
    }
}

export default SymbolFactory;