/* Stateless Attributes of Entities */


// 30030120001101051709 F-16 Friend SIDC
// 30060100001101051702 F-35 Hostile SIDC


const Entities = [
    {
        id:             'f16v',                 
        name:           'F-16/V',                  /*Entity Name                                           */
        kind:           'FixedWing',            /*Entity Kind                                            */
        sidc:           '30010100001101050000',  /*NATO Standart Symbology (Symbology Identification Code)*/
        affiliation:    'unknown',
        label:          'F-16/V',
    },
    {
        id:             'f35a',
        name:           'F-35/A',
        kind:           'FixedWing',
        sidc:           '30010100001101050000',
        affiliation:    'unknown',
        label:          'F-35/A',
    },
];

const EntitiesTree = [
    {
        id: 'root-fixed-wing',
        label: 'Fixed Wing',
        children: Entities.filter((entity) => entity.kind === 'FixedWing'),
    }
];


export { Entities, EntitiesTree };